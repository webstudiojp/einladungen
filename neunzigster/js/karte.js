/* =========================================================
   Die Karte fuellt sich aus js/daten.js und haengt drei
   Knoepfe an: Route, Kalender, Anruf. Mehr tut sie nicht --
   eine Einladung ist keine Anwendung.
   ========================================================= */
(() => {
  'use strict';
  const D = window.FEST || {};
  const $$ = w => [...document.querySelectorAll(w)];
  const sanft = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Angaben einsetzen ------------------------
     Jeder Wert steht genau einmal in daten.js und wird hier
     verteilt. Im HTML steht kein Datum zweimal, also kann
     auch keins zurueckbleiben. */
  const felder = {
    'name': D.name, 'name-lang': D.nameLang, 'gastgeber': D.gastgeber,
    'datum-lang': D.datumLang, 'datum-kurz': D.datumKurz,
    'uhrzeit': D.uhrzeit, 'uhrzeit-lang': D.uhrzeitLang,
    'frist-lang': D.fristLang, 'frist-kurz': D.fristKurz,
    'ort-name': D.ortName, 'ort-strasse': D.ortStrasse,
    'ort-ort': (D.ortPlz || '') + ' ' + (D.ortStadt || ''),
    'rueck-name': D.rueckName, 'rueck-telefon': D.rueckTelefon,
    'zahl': D.zahl,
  };
  for (const [schluessel, wert] of Object.entries(felder)) {
    if (wert == null) continue;
    $$('[data-' + schluessel + ']').forEach(el => { el.textContent = wert; });
  }

  /* Die Anrede haengt daran, ob geduzt wird -- steht sie nicht
     in den Daten, bleibt der Satz aus dem HTML stehen. */
  if (D.anrede) $$('[data-anrede]').forEach(el => { el.textContent = D.anrede; });

  /* ---------- 2. Der Zaehler ------------------------------
     Er laeuft bis zum Fest und haelt dann an. Ein Zaehler, der
     nach dem Termin ins Minus geht, ist der klassische Fehler --
     und faellt erst auf, wenn niemand mehr hinsieht. */
  function zaehler() {
    const feld = document.querySelector('[data-uhr]');
    if (!feld || !D.beginnISO) return;
    const ziel = new Date(D.beginnISO).getTime();
    const setz = (was, wert) => {
      const el = document.querySelector('[data-uhr-' + was + ']');
      if (el) el.textContent = String(wert).padStart(2, '0');
    };
    const rechnen = () => {
      const rest = ziel - Date.now();
      if (rest <= 0) {
        feld.classList.add('vorbei');
        ['tage','stunden','minuten','sekunden'].forEach(w => setz(w, 0));
        return false;
      }
      const s = Math.floor(rest / 1000);
      setz('tage', Math.floor(s / 86400));
      setz('stunden', Math.floor(s % 86400 / 3600));
      setz('minuten', Math.floor(s % 3600 / 60));
      setz('sekunden', s % 60);
      return true;
    };
    if (rechnen()) {
      const takt = setInterval(() => { if (!rechnen()) clearInterval(takt); }, 1000);
    }
  }
  zaehler();

  /* ---------- 3. Ablauf und Hinweise ---------------------
     Beide kommen aus daten.js. Wer eine Zeile streicht, streicht
     sie dort -- im HTML steht keine einzige davon. */
  const ablauf = document.querySelector('[data-ablauf]');
  if (ablauf && Array.isArray(D.ablauf)) {
    ablauf.innerHTML = D.ablauf.map(p =>
      '<li><span class="zeit">' + p.zeit + '</span>' +
      '<span class="titel">' + p.titel + '</span>' +
      (p.text ? '<span class="text">' + p.text + '</span>' : '') + '</li>'
    ).join('');
  }
  const hinweise = document.querySelector('[data-hinweise]');
  if (hinweise && Array.isArray(D.hinweise)) {
    hinweise.innerHTML = D.hinweise.map(h =>
      '<div><dt>' + h.titel + '</dt><dd>' + h.text + '</dd></div>'
    ).join('');
  }

  /* ---------- 4. Der Weg dorthin -------------------------
     Verlinkt, nicht eingebettet: eine Karte im Rahmen laedt
     schon beim Oeffnen Daten zu einem Anbieter, ein Link
     erst, wenn jemand ihn antippt.

     Auf einem Apple-Geraet fuehrt der Knopf zu Apple Karten,
     sonst zu Google -- wer ein iPhone hat, will Apple Karten. */
  const ziel = [D.ortName, D.ortStrasse, (D.ortPlz || '') + ' ' + (D.ortStadt || '')]
    .filter(Boolean).join(', ');
  const apple = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const route = apple
    ? 'https://maps.apple.com/?q=' + encodeURIComponent(ziel) +
      (D.lat ? '&ll=' + D.lat + ',' + D.lon : '')
    : 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(D.lat ? D.lat + ',' + D.lon : ziel);
  $$('[data-route]').forEach(a => { a.href = route; });

  /* ---------- 5. Termin merken ---------------------------
     Die Datei entsteht im Browser, ohne Server. iOS oeffnet
     sie nur ohne download-Attribut; alle anderen brauchen es,
     sonst zeigen sie den Text an, statt ihn zu uebernehmen. */
  const alsUTC = iso => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  $$('[data-kalender]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const zeilen = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Einladungen Digital//DE',
        'BEGIN:VEVENT',
        'UID:' + D.datumISO + '-neunzigster@einladung',
        'DTSTAMP:' + alsUTC(new Date().toISOString()),
        'DTSTART:' + alsUTC(D.beginnISO),
        'DTEND:' + alsUTC(D.endeISO),
        'SUMMARY:' + (D.name || '') + ' — ' + (D.anlass || 'Geburtstag'),
        'LOCATION:' + ziel.replace(/,/g, '\\,'),
        'DESCRIPTION:Beginn ' + (D.uhrzeit || '') + '. Rückmeldung bis ' + (D.fristKurz || '') + '.',
        'END:VEVENT', 'END:VCALENDAR',
      ].join('\r\n');

      const url = URL.createObjectURL(new Blob([zeilen], { type: 'text/calendar;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      if (apple) link.target = '_blank'; else link.download = 'geburtstag.ics';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
  });

  /* ---------- 6. Anrufen ---------------------------------- */
  const nummer = String(D.rueckTelefonLink || D.rueckTelefon || '').replace(/[^\d+]/g, '');
  $$('[data-telefon]').forEach(a => {
    if (nummer.length >= 6) a.href = 'tel:' + nummer;
    else a.removeAttribute('href');      /* Platzhalter fuehrt nirgendwohin */
  });

  /* ---------- 7. Der Umschlag ----------------------------
     Er wird hier zusammengesetzt statt im HTML hinterlegt: so
     traegt die Seite kein Geruest mit sich herum, das ohne
     Skript ohnehin nur im Weg stuende. Wer kein JavaScript hat,
     bekommt die Karte sofort -- das ist der bessere Ausfall.

     Die Wartezeiten unten sind dieselben wie im Stylesheet.
     Wer sie dort aendert, muss sie hier mitnehmen. */
  function umschlag() {
    if (sanft || /(^|[?&])offen(=|&|$)/.test(location.search)) return;

    const feld = document.createElement('div');
    feld.className = 'umschlag';
    feld.setAttribute('role', 'button');
    feld.setAttribute('tabindex', '0');
    feld.setAttribute('aria-label', 'Einladung öffnen');
    feld.innerHTML =
      '<div class="kuv" aria-hidden="true">' +
        '<div class="kuv-blatt"></div>' +
        '<div class="kuv-tasche"></div>' +
        '<div class="kuv-klappe"><i></i></div>' +
        '<div class="kuv-siegel"><b>' + (D.zahl || '90') + '</b></div>' +
      '</div>' +
      '<p class="umschlag-tippen">Zum Öffnen tippen</p>';
    document.body.appendChild(feld);
    document.documentElement.setAttribute('data-zu', '');

    let weg = false;
    const oeffnen = () => {
      if (weg) return;
      weg = true;
      feld.setAttribute('data-auf', '');
      setTimeout(() => {
        feld.setAttribute('data-weg', '');
        /* Die Sperre faellt erst mit der Blende. Faellt sie
           frueher, kann gescrollt werden, waehrend der Umschlag
           noch im Bild steht -- die Seite wandert dann hinter
           ihm weg. */
        setTimeout(() => document.documentElement.removeAttribute('data-zu'), 620);
        setTimeout(() => feld.remove(), 1310);
      }, 1700);
    };

    /* Gedrueckt wird auf pointerdown, geoeffnet auf pointerup.
       Dazwischen liegt der Moment, in dem das Papier nachgibt --
       ohne ihn waere es ein Knopf. */
    let gedrueckt = false;
    feld.addEventListener('pointerdown', e => {
      gedrueckt = true;
      feld.setPointerCapture?.(e.pointerId);
      feld.setAttribute('data-druck', '');
    });
    feld.addEventListener('pointerup', () => {
      if (!gedrueckt) return;
      gedrueckt = false; feld.removeAttribute('data-druck'); oeffnen();
    });
    feld.addEventListener('pointercancel', () => {
      gedrueckt = false; feld.removeAttribute('data-druck');
    });
    feld.addEventListener('click', oeffnen);
    feld.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      feld.setAttribute('data-druck', '');
      setTimeout(() => { feld.removeAttribute('data-druck'); oeffnen(); }, 180);
    });

    /* Wer zu wischen versucht, will weiter. */
    addEventListener('wheel', oeffnen, { passive: true, once: true });
    feld.addEventListener('touchmove', oeffnen, { passive: true });

    /* Reissleine: sollte weder Tippen noch Wischen ankommen,
       geht er nach fuenfundvierzig Sekunden von allein auf. */
    setTimeout(oeffnen, 45000);
  }
  umschlag();

  /* ---------- 8. Die Ballons ------------------------------
     Neun Stueck, jeder mit eigener Groesse, Dauer, Seitendrift
     und Neigung. Gewuerfelt wird mit festem Startwert: so sieht
     das Feld zufaellig aus, ist aber bei jedem Aufruf dasselbe --
     ein Ballon, der heute links und morgen rechts steht, ist
     kein Entwurf, sondern ein Zufall.

     Die Farben kommen aus der Palette der Karte. Bunt aus der
     Tuete waere hier der Reflex gewesen; neben einer geprägten
     Aprikot-Karte sieht es billig aus. */
  function ballons() {
    const feld = document.querySelector('[data-ballons]');
    if (!feld || sanft) return;

    /* Terrakotta ist raus. Es ist die Farbe der 90 -- ein Ballon
       darin waere erstens ein Doppel, und zweitens faellt die Zahl
       darauf auf 1,47:1 und verschwindet. Gemessen, nicht geahnt. */
    const toene = [
      ['#e5816d', '#d76a54'],   /* Koralle, wie die Dahlie */
      ['#ecad61', '#dd964a'],   /* Aprikot, wie die Ranunkel */
      ['#c47c64', '#b16850'],   /* Altrosa, wie die Nelke */
      ['#f0c9a8', '#e3b48e'],   /* helles Sandrosa */
      ['#f3d9bd', '#e7c4a0'],   /* Sand, fast Grundton */
    ];

    /* Linearer Kongruenzgenerator -- derselbe Zufall bei jedem
       Aufruf, ohne eine Bibliothek dafuer zu laden. */
    let keim = 90211126;
    const zufall = () => (keim = (keim * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const zwischen = (a, b) => a + zufall() * (b - a);

    let bau = '';
    for (let i = 0; i < 9; i++) {
      const [hell, dunkel] = toene[i % toene.length];
      const breit   = zwischen(46, 92);
      const links   = zwischen(2, 88);
      const dauer   = zwischen(17, 31);
      const warten  = -zwischen(0, 24);        /* negativ: sie sind schon unterwegs */
      const drift   = zwischen(-9, 9);
      const neigung = zwischen(2.5, 6.5);
      const pendel  = zwischen(3.4, 6.2);
      const kennung = 'bal' + i;

      bau +=
        '<span class="ballon" style="' +
          '--breit:' + breit.toFixed(0) + 'px;' +
          'left:' + links.toFixed(1) + '%;' +
          '--dauer:' + dauer.toFixed(1) + 's;' +
          '--warten:' + warten.toFixed(1) + 's;' +
          '--drift:' + drift.toFixed(1) + 'vw;' +
          '--neigung:' + neigung.toFixed(1) + 'deg;' +
          '--pendel:' + pendel.toFixed(1) + 's;' +
          /* Hoechstens ein gutes Drittel Deckung. Darueber
             konkurriert der Ballon mit dem, was auf ihm steht:
             die 90 faellt auf einem vollen Altrosa auf 2,67:1,
             und der Name soll nicht vor einem Ballon stehen,
             sondern darueber. */
          'opacity:' + zwischen(0.2, 0.36).toFixed(2) + '">' +
          '<span class="ballon-schwung">' +
          '<svg viewBox="0 0 60 104" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><radialGradient id="' + kennung + '" cx="34%" cy="28%" r="72%">' +
              '<stop offset="0" stop-color="' + hell + '"/>' +
              '<stop offset="1" stop-color="' + dunkel + '"/>' +
            '</radialGradient></defs>' +
            /* Die Schnur haengt leicht durch -- eine gerade Linie
               sieht aus wie ein Stab, nicht wie ein Faden. */
            '<path d="M30 70 q4 13 -2 22 q-5 8 1 12" fill="none" ' +
              'stroke="' + dunkel + '" stroke-width="1" opacity=".5"/>' +
            '<ellipse cx="30" cy="36" rx="27" ry="34" fill="url(#' + kennung + ')"/>' +
            /* Das Knoetchen am Hals, sonst endet die Schnur im Nichts. */
            '<path d="M26 69 l4 -5 l4 5 z" fill="' + dunkel + '"/>' +
            '<ellipse cx="21" cy="24" rx="7" ry="10" fill="#fff" opacity=".22" ' +
              'transform="rotate(-18 21 24)"/>' +
          '</svg>' +
          '</span>' +
        '</span>';
    }
    feld.innerHTML = bau;
  }
  ballons();

  /* ---------- 9. Auftritt beim Scrollen -------------------
     Die Marke am html-Element sagt dem Stylesheet, dass es
     etwas verbergen darf. Sie kommt erst hier, unmittelbar
     bevor die Beobachtung uebernommen wird: schafft es der
     Ablauf nicht bis hierher, bleibt nichts verborgen.
     Unsichtbarer Text darf nie der Ruhezustand sein. */
  const teile = $$('[data-tritt]');
  if (!teile.length) return;
  const zeigen = el => el.classList.add('da');

  if (sanft || !('IntersectionObserver' in window)) { teile.forEach(zeigen); return; }

  document.documentElement.setAttribute('data-auftritt-aktiv', '');
  let gemeldet = false;
  const b = new IntersectionObserver((eintraege, selbst) => {
    gemeldet = true;
    for (const e of eintraege) {
      if (!e.isIntersecting) continue;
      zeigen(e.target); selbst.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  teile.forEach(el => b.observe(el));

  /* Sicherung: meldet sich der Beobachter nicht -- etwa weil die
     Karte in einem Hintergrundreiter geoeffnet wurde --, steht
     nach knapp zwei Sekunden trotzdem alles da. */
  setTimeout(() => { if (!gemeldet) teile.forEach(zeigen); }, 1800);
  addEventListener('visibilitychange', () => {
    if (!document.hidden && !gemeldet) setTimeout(() => teile.forEach(zeigen), 500);
  });
})();
