/* =========================================================
   DIGITALE HOCHZEITSKARTE — INHALTE
   Pro Paar wird ausschliesslich diese Datei angefasst.
   Datensatz: Ismail & Suna, 21.09.2026

   Aufbau: Zuerst die sprachneutralen Angaben (Namen, Termine,
   Adresse, Bankverbindung), danach unter `sprachen` alles,
   was uebersetzt werden muss.
   ========================================================= */
window.HOCHZEIT = {

  // Wird von bin/veroeffentlichen.sh gesetzt und an alle Bilder gehaengt,
  // damit Browser nach einer Aenderung nicht die alte Fassung zeigen.
  version: '202608312001',

  /* ---------- Sprachen ---------- */
  standardsprache: 'de',
  sprachfolge: ['de', 'tr'],

  /* ---------- Das Paar ---------- */
  /* Noch offen: beide Nachnamen. */
  braut:        'Suna',
  braeutigam:   'İsmail',
  namen:        'Suna & İsmail',
  datumKurz:    '21.11.2026',
  datumISO:     '2026-11-21',
  /* Mit Zeitzonenversatz, sonst rechnen Countdown und Kalendereintrag in
     der Zeit des Betrachters. +01:00 = Winterzeit (ab Ende Oktober). */
  beginnISO:    '2026-11-21T16:00:00+01:00',
  endeISO:      '2026-11-22T00:00:00+01:00',

  /* ---------- Hero-Animation ---------- */
  hero: {
    schriftzug:   'biz evleniyoruz',   // steht als Blumenspur auf der Fahrbahn
    ausrichtung:  'strasse',       // 'strasse' = Spur des Wagens laengs der Fahrbahn
    trenner:      'herz',          // 'herz' | 'zeichen'
    herzZeigen:   true,
    tempo:        1.0,
    ueberspringbar: true,
  },

  /* ---------- Ort (sprachneutral) ---------- */
  ort: {
    strasse: 'An der Knippenburg 115',
    plz:     '46238',
    stadt:   'Bottrop',
    /* Nur fuer die gezeichnete Lageskizze. Die Karten-Knoepfe suchen
       ueber die Adresse, nicht ueber diese Werte. */
    lat: 51.523, lon: 6.965,
  },

  /* ---------- Familien (Namen sind sprachneutral) ---------- */
  /* Namen von der gedruckten Einladung uebernommen, Zuordnung bestaetigt. */
  familien: [
    { schluessel: 'braeutigamseite',
      namen:    ['Dürdane und Mehmet Mustafa Bozhüyük'],
      namen_tr: ['Dürdane ve Mehmet Mustafa Bozhüyük'] },
    { schluessel: 'brautseite',
      namen:    ['Hasret und der verstorbene Süleyman Çıkın'],
      namen_tr: ['Hasret ve merhum Süleyman Çıkın'] },
    { schluessel: 'trauzeugen',      namen: ['Annemaria Amedahevi', 'Küşat Altun'] },
  ],

  /* ---------- Geschenke ---------- */
  geschenk: {
    kontoinhaber: 'KONTOINHABER',   // TODO, falls die Geschenke-Karte bleibt
    iban: 'DE89 3704 0044 0532 0130 00',   // Beispiel-IBAN, kein echtes Konto
  },

  /* ---------- Ablauf: Uhrzeit und Symbol, sprachneutral ----------
     Reihenfolge wie unter sprachen.*.ablauf. Symbole:
     ringe · glaeser · besteck · tanz · torte · mond            */
  zeiten:  ['16:00', '17:00', '18:30', '20:30', '21:30', '00:00'],
  symbole: ['ringe', 'glaeser', 'besteck', 'tanz', 'torte', 'mond'],

  /* ---------- Gut zu wissen ---------- */
  wissen: ['bett', 'auto', 'geschenk'],

  /* ---------- Rueckmeldung ---------- */
  rsvp: { frist_iso: '2026-10-24' },

  /* ---------- Galerie ---------- */
  galerie: [
    { datei: 'assets/img/paar1.webp', schluessel: 'g1' },
    { datei: 'assets/img/paar2.webp', schluessel: 'g2' },
    { datei: 'assets/img/paar3.webp', schluessel: 'g3' },
    { datei: 'assets/img/paar4.webp', schluessel: 'g4' },
    { datei: 'assets/img/paar5.webp', schluessel: 'g5' },
  ],

  /* ---------- Dresscode-Farben (Namen uebersetzt) ---------- */
  farben: [
    { hex: '#6d7a63', schluessel: 'salbei' },
    { hex: '#8a6f5c', schluessel: 'nuss' },
    { hex: '#3f4a55', schluessel: 'rauchblau' },
    { hex: '#a8894e', schluessel: 'altgold' },
  ],

  /* =========================================================
     Alles Uebersetzbare
     ========================================================= */
  sprachen: {

    /* ------------------------- DEUTSCH ------------------------- */
    de: {
      name: 'Deutsch', kuerzel: 'DE', htmlLang: 'de',
      datumLang: 'Samstag, 21. November 2026',
      monate: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
      wochentage: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],

      umschlagKicker: 'Eine Einladung für dich',
      umschlagHinweis:'Tippe auf den Umschlag',
      heroZeile:      'wir heiraten',
      ueberspringen:  'Überspringen',
      weiter:         'Weiter',

      kopfUeberzeile: 'Die Einladung',
      merken:         'Erinnerung hinzufügen',
      kalenderKnopf: 'Termin speichern',
      kalenderFertig: 'Gespeichert',
      kalenderNotiz: adr => 'Wir freuen uns auf euch. Alle Angaben zum Tag: ' + adr,

      /* Mehrere Absaetze: karte.js baut daraus je ein <p>. */
      anredeText: [
        'Am 21. November möchten wir diesen besonderen Tag mit euch feiern.',
        'Freut euch auf gutes Essen, Musik und viele schöne Momente. '
          + 'Lasst uns gemeinsam lachen, tanzen und einfach eine wundervolle Zeit haben.',
        'Wir freuen uns auf einen unvergesslichen Abend mit euch!',
      ],
      anredeGruss: 'Suna & İsmail',

      zitat: 'Ein Tag. Und danach alle anderen.',
      zitatKlein: 'Wir freuen uns darauf, ihn mit euch anzufangen.',
      abschiedGross: 'Bis bald',
      abschiedText: 'Bringt gute Schuhe mit. Es wird spät.',

      countdownUeber: 'Noch',
      cdTage: 'Tage', cdStunden: 'Stunden', cdMinuten: 'Minuten', cdSekunden: 'Sekunden',
      countdownFuss: n => 'bis zum ' + n,
      countdownHeute: 'Heute ist es so weit.',

      wissenTitel: 'Gut zu wissen',
      wissen: {
        bett: { titel: 'Übernachtung',
                text: '' },
        auto: { titel: 'Anreise und Parken',
                text: 'Am Westflügel gibt es Parkplätze, die reichen erfahrungsgemäß. '
                    + 'Der Taxistand liegt direkt am Parkeingang.' },
        geschenk: { titel: 'Geschenke',
                text: 'Ihr müsst nichts mitbringen. Wer trotzdem möchte, findet '
                    + 'weiter unten unsere Bankverbindung.' },
      },

      ablaufTitel: 'Der Tag',
      ablauf: [
        /* Zeiten: Beginn und Ende von der Kundin. Die Stationen dazwischen
           sind ein Vorschlag - bitte gegenlesen lassen. */
        { titel: 'Empfang',         ort: 'Ceremony' },
        { titel: 'Freie Trauung',   ort: 'Ceremony' },
        { titel: 'Abendessen',      ort: 'Ceremony' },
        { titel: 'Eröffnungstanz',  ort: 'Ceremony' },
        { titel: 'Torte und Feier', ort: 'Ceremony' },
        { titel: 'Ende',            ort: '' },
      ],

      ortTitel: 'Wo',
      ortName: 'Ceremony Eventlocation',
      ortBildAlt: 'Die Ceremony Eventlocation in Bottrop',
      ortHinweis: '',   // TODO Parken / Anfahrt, falls die Kundin etwas dazu sagen moechte
      routeGoogle: 'Route mit Google Maps',
      routeApple:  'Apple Karten',
      kartenAlt: ort => 'Schematische Lage: ' + ort + ' an der Knippenburg in Bottrop',

      familienTitel: 'Mit uns freuen sich',
      rollen: { brautseite: 'Eltern der Braut', braeutigamseite: 'Eltern des Bräutigams', trauzeugen: 'Trauzeugen' },

      dresscodeTitel: 'Dresscode',
      dresscodeKopf: 'Festlich, gerne lang',
      dresscodeText: '',
      farbnamen: { salbei: 'Salbei', nuss: 'Nussbraun', rauchblau: 'Rauchblau', altgold: 'Altgold' },

      galerieTitel: 'Wir zwei',
      bildtexte: {
        g1: 'İsmail und Suna bei ihrer Verlobung, im Hintergrund der Schriftzug Sözümüz Söz',
        g2: 'Die beiden nebeneinander in der Bahn',
        g3: 'İsmail und Suna im Café',
        g4: 'Die beiden Arm in Arm zu Hause',
        g5: 'İsmail und Suna unterwegs in der Stadt',
      },

      albumTitel: 'Euer Blick auf den Tag',
      albumText: 'Fotos, ein kurzes Video oder ein paar gesprochene Worte – '
               + 'alles, was ihr hier hochladet, landet in unserem Album.',
      albumWaehlen: 'Datei auswählen',
      albumArten: 'Bild, Video oder Sprachnotiz',
      albumEine: 'Eine Datei ausgewählt. In dieser Vorschau wird noch nichts hochgeladen – dafür fehlt die Serveranbindung.',
      albumMehrere: n => n + ' Dateien ausgewählt. In dieser Vorschau wird noch nichts hochgeladen – dafür fehlt die Serveranbindung.',

      geschenkTitel: 'Geschenke',
      geschenkText: 'Ihr müsst nichts mitbringen. Wer uns trotzdem etwas schenken möchte: '
                  + '[Text folgt, falls dieser Abschnitt zurueckkommt]',
      kopieren: 'Kopieren', kopiert: 'Kopiert', kopierenHand: 'Bitte von Hand kopieren',

      rsvpTitel: 'Sagt ihr uns Bescheid?',
      rsvpHinweis: frist => 'Bitte bis zum ' + frist + '. Danach steht die Bestellung beim Caterer fest.',
      fName: 'Euer Name', fNamePlatz: 'Vorname und Nachname', fNameFehler: 'Bitte tragt euren Namen ein.',
      fKommt: 'Kommt ihr?', fJa: 'Wir kommen', fNein: 'Wir können leider nicht',
      fZusageFehler: 'Bitte wählt eine der beiden Antworten.',
      fAnzahl: 'Wie viele Personen',
      fGruss: 'Ein paar Worte an uns', fGrussPlatz: 'Wir freuen uns schon!',
      fOptional: 'optional',
      fEinwilligung: 'Ich bin einverstanden, dass meine Angaben zur Planung der Feier '
                   + 'gespeichert und nach der Hochzeit gelöscht werden.',
      fDsgvoFehler: 'Ohne dieses Häkchen dürfen wir die Angaben nicht speichern.',
      fSenden: 'Rückmeldung senden',
      rsvpJa: 'Die Eingaben sind vollständig. In dieser Vorschau geht noch nichts raus – '
            + 'für den Versand und die Gästeliste fehlt die Serveranbindung.',
      rsvpNein: 'Schade. Die Eingaben sind vollständig – in dieser Vorschau wird noch nichts versendet.',



      verantwortlich: 'Suna und İsmail',   // TODO Kontaktadresse ergaenzen, falls gewuenscht
      datenschutz: 'Diese Seite setzt keine Cookies und lädt weder Schriften noch Karten von fremden Servern. '
                 + 'Der Termin wird auf eurem Gerät erzeugt, die Kartenknöpfe öffnen erst nach eurem Klick eine Karten-App.',
      demoHinweis: '',
      seitentitel: namen => namen + ' — Wir heiraten',
    },

    /* ------------------------- TÜRKISCH ------------------------- */
    tr: {
      name: 'Türkçe', kuerzel: 'TR', htmlLang: 'tr',
      datumLang: '21 Kasım 2026 Cumartesi',
      monate: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
      wochentage: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],

      umschlagKicker: 'Size özel bir davetiye',
      umschlagHinweis:'Zarfa dokunun',
      heroZeile:      'evleniyoruz',
      ueberspringen:  'Geç',
      weiter:         'Aşağı kaydırınız',

      kopfUeberzeile: 'Davetiye',
      merken:         'Hatırlatıcı ekle',
      kalenderKnopf: 'Takvime ekle',
      kalenderFertig: 'Eklendi',
      kalenderNotiz: adr => 'Sizi aramızda görmek için sabırsızlanıyoruz. Günün tüm ayrıntıları: ' + adr,

      anredeText: [
        '21 Kasım günü bu özel günü sizinle birlikte kutlamak istiyoruz.',
        'Güzel yemekler, müzik ve nice güzel anlar sizi bekliyor. '
          + 'Birlikte gülelim, dans edelim ve harika bir zaman geçirelim.',
        'Sizinle unutulmaz bir akşam geçirmeyi dört gözle bekliyoruz!',
      ],
      anredeGruss: 'Suna & İsmail',

      zitat: 'Bir gün. Ve ardından bütün diğerleri.',
      zitatKlein: 'Bu güne sizinle başlamak bizi mutlu edecek.',
      abschiedGross: 'Görüşmek üzere',
      abschiedText: 'Rahat ayakkabı getirin. Gece uzun sürecek.',

      countdownUeber: 'Geri sayım',
      cdTage: 'Gün', cdStunden: 'Saat', cdMinuten: 'Dakika', cdSekunden: 'Saniye',
      countdownFuss: n => n + ' tarihine',
      countdownHeute: 'Bugün o gün!',

      wissenTitel: 'Bilmekte fayda var',
      wissen: {
        bett: { titel: 'Konaklama',
                text: 'Saray parkındaki otelde 1 Kasım’a kadar adımıza oda ayrıldı. '
                    + 'Yürüyerek on dakika.' },
        auto: { titel: 'Ulaşım ve otopark',
                text: 'Batı kanadında otopark var, genelde yeterli oluyor. '
                    + 'Taksi durağı park girişinin hemen yanında.' },
        geschenk: { titel: 'Hediye',
                text: 'Bir şey getirmenize gerek yok. Yine de isteyenler için '
                    + 'banka bilgimiz aşağıda.' },
      },

      ablaufTitel: 'Günün akışı',
      ablauf: [
        { titel: 'Karşılama',        ort: 'Ceremony' },
        { titel: 'Nikâh töreni',     ort: 'Ceremony' },
        { titel: 'Akşam yemeği',     ort: 'Ceremony' },
        { titel: 'İlk dans',         ort: 'Ceremony' },
        { titel: 'Pasta ve eğlence', ort: 'Ceremony' },
        { titel: 'Kapanış',          ort: '' },
      ],

      ortTitel: 'Konum',
      ortName: 'Ceremony Eventlocation',
      ortBildAlt: 'Bottrop’daki Ceremony Eventlocation',
      ortHinweis: '',
      routeGoogle: 'Google Haritalar ile yol tarifi',
      routeApple:  'Apple Haritalar',
      kartenAlt: ort => 'Konum şeması: saray parkındaki ' + ort + ', kuzeyden giriş',

      familienTitel: 'Sevdiklerimiz',
      rollen: { brautseite: 'Gelin tarafı', braeutigamseite: 'Damat tarafı', trauzeugen: 'Şahitlerimiz' },

      dresscodeTitel: 'Kıyafet',
      dresscodeKopf: 'Şık, tercihen uzun',
      dresscodeText: '',
      farbnamen: { salbei: 'Adaçayı', nuss: 'Kahve', rauchblau: 'Duman mavisi', altgold: 'Eski altın' },

      galerieTitel: 'Biz ikimiz',
      bildtexte: {
        g1: 'İsmail ve Suna nişanlarında, arkalarında Sözümüz Söz yazısı',
        g2: 'İkisi metroda yan yana',
        g3: 'İsmail ve Suna kafede',
        g4: 'İkisi evde kol kola',
        g5: 'İsmail ve Suna şehirde',
      },

      albumTitel: 'Anı albümü',
      albumText: 'Fotoğraf, kısa bir video ya da birkaç kelime – '
               + 'buraya yüklediğiniz her şey albümümüze düşer.',
      albumWaehlen: 'Dosya seçin',
      albumArten: 'Fotoğraf, video veya ses kaydı',
      albumEine: 'Bir dosya seçildi. Bu önizlemede henüz yükleme yapılmıyor – sunucu bağlantısı eksik.',
      albumMehrere: n => n + ' dosya seçildi. Bu önizlemede henüz yükleme yapılmıyor – sunucu bağlantısı eksik.',

      geschenkTitel: 'Hediye',
      geschenkText: 'Varlığınız bizim için en değerli hediye. Yine de bir şey vermek isteyenler için: '
                  + 'Kapadokya’ya balayı için biriktiriyoruz.',
      kopieren: 'Kopyala', kopiert: 'Kopyalandı', kopierenHand: 'Lütfen elle kopyalayın',

      rsvpTitel: 'Katılım bildirimi',
      rsvpHinweis: frist => 'Lütfen ' + frist + ' tarihine kadar bildirin. Sonrasında ikram siparişi kesinleşiyor.',
      fName: 'Adınız soyadınız', fNamePlatz: 'Adınız ve soyadınız', fNameFehler: 'Lütfen adınızı yazın.',
      fKommt: 'Katılacak mısınız?', fJa: 'Katılıyoruz', fNein: 'Maalesef katılamıyoruz',
      fZusageFehler: 'Lütfen iki seçenekten birini işaretleyin.',
      fAnzahl: 'Kaç kişi',
      fGruss: 'Bize birkaç kelime', fGrussPlatz: 'Şimdiden heyecanlıyız!',
      fOptional: 'isteğe bağlı',
      fEinwilligung: 'Bilgilerimin düğün planlaması için saklanmasını ve düğünden sonra '
                   + 'silinmesini kabul ediyorum.',
      fDsgvoFehler: 'Bu onay olmadan bilgileri saklayamayız.',
      fSenden: 'Gönder',
      rsvpJa: 'Bilgiler eksiksiz. Bu önizlemede henüz gönderim yapılmıyor – '
            + 'gönderim ve konuk listesi için sunucu bağlantısı eksik.',
      rsvpNein: 'Üzüldük. Bilgiler eksiksiz – bu önizlemede henüz gönderim yapılmıyor.',



      verantwortlich: 'Suna ve İsmail',
      datenschutz: 'Bu sayfa çerez kullanmaz, yazı tiplerini ve haritaları başka sunuculardan yüklemez. '
                 + 'Takvim kaydı cihazınızda oluşturulur; harita düğmeleri yalnızca siz dokununca bir harita uygulaması açar.',
      demoHinweis: '',
      seitentitel: namen => namen + ' — Evleniyoruz',
    },
  },
};
