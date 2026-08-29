# Einladungen

Alle digitalen Einladungskarten von JP Webstudio, ein Ordner je Paar.
Erreichbar unter `https://karten.einladungendigital.de/<ordner>/`.

## Neue Karte anlegen

```bash
bin/neue-karte.sh mehmet-ayse "Mehmet & Ayşe"
```

Kopiert die zuletzt gebaute Karte als Vorlage, stellt die Adressen um und
setzt die Namen. Danach `js/config.js` im neuen Ordner ausfüllen (Datum,
Ort, Familien, Galerie) und die Fotos nach `assets/img/` legen.

**Kurzname:** nur Kleinbuchstaben, Ziffern und Bindestriche. Unterstriche
und Umlaute sind in Webadressen nicht erlaubt — also `mehmet-ayse`, nicht
`Mehmet_Ayşe`.

## Live stellen

```bash
bin/veroeffentlichen.sh "was geändert wurde"
```

Setzt bei allen Karten frische Versionsnummern (sonst liefern Browser
tagelang die alte Fassung aus dem Zwischenspeicher) und schiebt alles hoch.
Nach etwa einer Minute ist es online.

## Warum ein Repository für alle

GitHub Pages erlaubt pro Repository nur eine Domain. Ein eigenes Repo je
Paar hieße: jedes Mal DNS-Eintrag, eigenes Zertifikat, eigene Einrichtung.
So genügt ein DNS-Eintrag für alles, und eine neue Karte ist ein Ordner.

## Suchmaschinen

`robots.txt` und ein `noindex` in jeder Karte halten die Einladungen aus
Suchmaschinen heraus — sie enthalten Namen, Adressen und Familiendaten.
Erreichbar sind sie über den Link, auffindbar nicht.
