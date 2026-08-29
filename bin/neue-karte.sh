#!/usr/bin/env bash
# Legt eine neue Einladung an: bin/neue-karte.sh <kurzname> ["Vorname & Vorname"]
#
#   bin/neue-karte.sh mehmet-ayse "Mehmet & Ayşe"
#
# Kopiert die zuletzt gebaute Karte als Vorlage, stellt die Adressen um und
# setzt die Namen. Danach nur noch js/config.js ausfuellen und
# bin/veroeffentlichen.sh aufrufen.
set -euo pipefail
cd "$(dirname "$0")/.."

KURZ="${1:-}"
NAMEN="${2:-}"
if [ -z "$KURZ" ]; then
  echo "Aufruf: bin/neue-karte.sh <kurzname> [\"Vorname & Vorname\"]"
  echo "Beispiel: bin/neue-karte.sh mehmet-ayse \"Mehmet & Ayşe\""
  exit 1
fi
if [ -e "$KURZ" ]; then
  echo "Es gibt schon einen Ordner '$KURZ'. Bitte anderen Kurznamen waehlen."
  exit 1
fi
# Kurznamen pruefen: nur Kleinbuchstaben, Ziffern, Bindestrich.
# Unterstriche und Umlaute sind in Adressen nicht erlaubt.
if ! printf '%s' "$KURZ" | grep -Eq '^[a-z0-9-]+$'; then
  echo "Der Kurzname darf nur a-z, 0-9 und Bindestriche enthalten."
  echo "Also 'mehmet-ayse', nicht 'Mehmet_Ayşe'."
  exit 1
fi

VORLAGE="$(ls -dt */ 2>/dev/null | grep -v '^bin/' | head -1 | tr -d '/')"
if [ -z "$VORLAGE" ]; then echo "Keine Vorlage gefunden."; exit 1; fi
echo "Vorlage: $VORLAGE"

cp -R "$VORLAGE" "$KURZ"
rm -rf "$KURZ"/.git

# Adressen der Vorlage auf den neuen Ordner umstellen
perl -0777 -i -pe "s|/$VORLAGE/|/$KURZ/|g" "$KURZ/index.html"

if [ -n "$NAMEN" ]; then
  A="${NAMEN%% *}"                       # erster Vorname
  B="${NAMEN##* }"                       # letzter Vorname
  perl -0777 -i -pe "s|^(  braeutigam:\s*')[^']*|\${1}$A|m" "$KURZ/js/config.js"
  perl -0777 -i -pe "s|^(  braut:\s*')[^']*|\${1}$B|m"      "$KURZ/js/config.js"
  perl -0777 -i -pe "s|^(  namen:\s*')[^']*|\${1}$NAMEN|m"  "$KURZ/js/config.js"
  echo "Namen gesetzt: $NAMEN"
fi

echo
echo "Fertig: $KURZ/"
echo "Als Naechstes:"
echo "  1. $KURZ/js/config.js ausfuellen (Datum, Ort, Familien, Galerie)"
echo "  2. Fotos nach $KURZ/assets/img/ legen"
echo "  3. bin/veroeffentlichen.sh \"$KURZ angelegt\""
echo
echo "Spaeter erreichbar unter:"
echo "  https://karten.einladungendigital.de/$KURZ/"
