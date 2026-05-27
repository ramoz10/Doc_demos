#!/bin/bash
# Despliegue en servidor (ej. 192.168.1.16).
# Sincroniza código, build de Next.js y contenido en SQLite.
#
# Uso: ./scripts/deploy-production.sh
# Requiere: git, npm, pm2 (proceso "doc-demos" ya configurado)

set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "=== Git pull (main) ==="
git fetch origin
git checkout main
git pull origin main
echo "Commit: $(git log -1 --oneline)"

echo "=== Alinear con origin/main (evita page.tsx corrupto en servidor) ==="
git checkout origin/main -- 'src/app/[clientSlug]/page.tsx'

echo "=== Quitar fuentes locales no versionadas en src/ (rompen npm run build) ==="
untracked_src=$(git ls-files --others --exclude-standard 'src/**/*.tsx' 'src/**/*.ts' 2>/dev/null || true)
if [ -n "$untracked_src" ]; then
  echo "$untracked_src" | while read -r f; do
    [ -n "$f" ] && echo "  eliminando $f" && rm -f "$f"
  done
fi

echo "=== Verificar page.tsx antes del build ==="
bash scripts/verify-build-ready.sh

echo "=== Verificar que el header no use sticky/fixed ==="
if grep -E 'sticky|fixed|top-0' src/components/landing/LandingHeaderClient.tsx; then
  echo "ERROR: LandingHeaderClient no debe usar position sticky/fixed."
  exit 1
fi
echo "OK: header en flujo normal del documento."

echo "=== Dependencias y build ==="
npm ci
rm -rf .next
npm run build

echo "=== SQLite: MetLife (hero + guía desde src/content) ==="
npm run db:seed-metlife-seguros

echo "=== SQLite: resto de landings con guías en código ==="
npm run db:migrate-landing-templates

echo "=== PM2 ==="
if [ ! -f ".next/BUILD_ID" ]; then
  echo "ERROR: no existe .next/BUILD_ID — el build falló o no se ejecutó."
  exit 1
fi
if command -v pm2 >/dev/null 2>&1; then
  pm2 delete doc-demos 2>/dev/null || true
  pm2 start ecosystem.config.cjs
  pm2 save
  sleep 3
  pm2 status
  if ! pm2 jlist 2>/dev/null | grep -q '"status":"online"'; then
    echo "PM2 no quedó estable. Revisa: pm2 logs doc-demos --lines 80"
    exit 1
  fi
else
  echo "pm2 no está en PATH; reinicia doc-demos manualmente."
fi

echo "=== Listo ==="
