#!/usr/bin/env bash
# Stellt alle Einladungen live. Setzt vorher frische Versionsnummern, damit
# Browser nicht tagelang die alte Fassung aus dem Zwischenspeicher liefern.
set -euo pipefail
cd "$(dirname "$0")/.."

V="$(date +%Y%m%d%H%M)"
for ordner in */; do
  ordner="${ordner%/}"
  [ "$ordner" = "bin" ] && continue
  [ -f "$ordner/index.html" ] || continue
  perl -0777 -i -pe "s|(href=\"css/[a-z-]+\\.css)(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$ordner/index.html"
  perl -0777 -i -pe "s|(src=\"js/[a-z-]+\\.js)(\\?v=\\d+)?\"|\$1?v=$V\"|g"    "$ordner/index.html"
  perl -0777 -i -pe "s|((?:src\|href)=\"assets/img/[a-z0-9-]+\\.webp)(\\?v=\\d+)?\"|\$1?v=$V\"|g" "$ordner/index.html"
  [ -f "$ordner/js/config.js" ] && perl -0777 -i -pe "s|(^  version:\\s*')[^']*(')|\${1}$V\${2}|m" "$ordner/js/config.js"
  echo "  $ordner aktualisiert"
done

git add -A
git commit -q -m "${1:-Aktualisierung}

Version $V

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" || { echo "Nichts zu veroeffentlichen."; exit 0; }
git push -q origin "$(git branch --show-current)"
echo
echo "Live in etwa einer Minute:"
for ordner in */; do
  ordner="${ordner%/}"
  [ "$ordner" = "bin" ] && continue
  [ -f "$ordner/index.html" ] && echo "  https://karten.einladungendigital.de/$ordner/"
done
