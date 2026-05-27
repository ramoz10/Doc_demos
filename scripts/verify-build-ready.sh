#!/bin/bash
# Comprueba page.tsx antes del build (informativo).
set -e
PAGE="src/app/[clientSlug]/page.tsx"
if [ ! -f "$PAGE" ]; then
  echo "No se encontró $PAGE"
  exit 1
fi
if awk '/<LandingHeader/,/\/>/ { if (/templateId=/) found=1 } END { exit found ? 0 : 1 }' "$PAGE"; then
  echo "AVISO: $PAGE pasa templateId a LandingHeader (se ignora; preferible quitarlo)."
else
  echo "OK: LandingHeader sin templateId."
fi
