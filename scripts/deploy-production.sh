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

echo "=== Dependencias y build ==="
npm ci
npm run build

echo "=== SQLite: MetLife (hero + guía desde src/content) ==="
npm run db:seed-metlife-seguros

echo "=== SQLite: resto de landings con guías en código ==="
npm run db:migrate-landing-templates

echo "=== PM2 ==="
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart doc-demos 2>/dev/null || pm2 start npx --name doc-demos -- next start -p 3000
  pm2 save
  pm2 status
else
  echo "pm2 no está en PATH; reinicia doc-demos manualmente."
fi

echo "=== Listo ==="
