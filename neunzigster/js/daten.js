/* =========================================================
   DIE EINLADUNG — alle Angaben an einer Stelle

   Wer etwas aendern will, aendert es hier und nirgends sonst.
   Die Seite holt sich jeden Wert von hier; im HTML steht kein
   Datum und kein Name zweimal.
   ========================================================= */
window.FEST = {

  /* Doris laedt selbst ein. Das ist keine Kleinigkeit fuer den
     Text: jedes "wir" waere die Stimme der Kinder, jedes "sagt
     uns Bescheid" ginge an die falsche Person. Die ganze Karte
     spricht deshalb in ihrer Stimme. */
  name:        'Doris Diesinger',
  nameLang:    'Doris Diesinger',
  kurzname:    'Doris',
  gastgeber:   'Eure Doris',

  /* Angezeigt wird die Nummer lesbar gruppiert, gewaehlt wird sie
     international -- so funktioniert der Knopf auch, wenn jemand
     aus dem Ausland anruft. */
  rueckTelefon:     '0157 85811771',
  rueckTelefonLink: '+4915785811771',
  rueckName:        'Doris',

  zahl:        '90',
  anlass:      '90. Geburtstag',

  /* Termin: 11 bis 17 Uhr. Der Zeitzonenanhang muss stehen
     bleiben -- ohne ihn rechnet der Kalender in der Zeit des
     Betrachters, und wer im Urlaub zusagt, traegt sich falsch ein. */
  datumISO:    '2026-11-21',
  beginnISO:   '2026-11-21T11:00:00+01:00',
  endeISO:     '2026-11-21T17:00:00+01:00',   /* bestaetigt */
  datumLang:   'Samstag, 21. November 2026',
  datumKurz:   '21.11.2026',
  uhrzeit:     '11 bis 17 Uhr',
  uhrzeitLang: '11 bis 17 Uhr',

  /* Rueckmeldung */
  fristISO:    '2026-11-07',
  fristLang:   'Samstag, 7.\u00a0November 2026',
  fristKurz:   '07.11.2026',

  /* Ort. Die Koordinaten sind nachgeschlagen, nicht geraten --
     der Routenknopf fuehrt damit auf den Hof und nicht in die
     Strassenmitte. */
  ortName:     'Hotel am Wald',
  ortStrasse:  'An der Alten Ziegelei 4',
  ortPlz:      '40789',
  ortStadt:    'Monheim am Rhein',
  lat:         51.0939699,
  lon:         6.9136552,

  /* --- Der Ablauf des Tages ------------------------------
     So hat Doris ihn aufgeschrieben (Zettel vom 24.09.2026).
     Eine Zeile entfernen heißt: die Zeile hier löschen.     */
  ablauf: [
    { zeit: '11:00', titel: 'Empfang',       text: 'Ankommen.' },
    { zeit: '12:00', titel: 'Mittagessen',   text: 'In Buffetform.' },
    { zeit: '15:00', titel: 'Kaffee und Kuchen', text: 'Zeit zum Reden, Zeit für Geschichten.' },
    { zeit: '17:00', titel: 'Ausklang',      text: 'Dann sind wir wahrscheinlich alle geschafft.' },
  ],

  /* --- Gut zu wissen -------------------------------------
     Bei diesem Anlass die wichtigsten Angaben überhaupt:
     viele Gäste sind selbst über siebzig. Von Doris bestätigt. */
  hinweise: [
    { titel: 'Parken',        text: 'Parkplätze gibt es an der Straße und auf dem hoteleigenen Parkplatz.' },
  ],
};
