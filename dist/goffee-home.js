/* ============================================================================
   Goffee — Home · versione production self-contained (vanilla JS, 0 dipendenze)
   Ricostruisce fedelmente "Home Goffee.html": navbar + hero (foto pizza) +
   anteprima menù + footer. Si monta in un contenitore #goffee-home-root.

   PERSONALIZZA solo il blocco CONFIG qui sotto (telefono, link al menù, immagini).
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    mount: "#goffee-home-root",
    tel: "0341 851178",
    // Indirizzo della pagina Menù sul tuo sito Webflow.
    // Si può anche impostare nello snippet: <div id="goffee-home-root" data-menu-url="/menu">
    menuUrl: "/menu",
    logoSrc: "https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v6/dist/goffee-logo.png",
    pizzaSrc: "https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v6/dist/pizza-top.jpg",
    address: "Via Martiri della Liberazione 20 · Dervio (LC)",
    mapsUrl: "https://maps.google.com/?q=Via+Martiri+della+Liberazione+20+Dervio",
    hours: { lunch: "11:30 – 14:00", dinner: "17:30 – 22:00", closed: "Lunedì chiuso" },
    legal: "© 2026 Goffee - Pizzeria. Tutti i diritti riservati. Fatto con ❤️ e tanta farina.",
    instagram: "#",
    facebook: "#",
    // Ordinazione online GloriaFood (Pizzeria Goffee)
    glfCuid: "b32d7c17-f989-4a1c-8fb2-d742de772f04",
    glfRuid: "566de29e-8e05-47ca-982b-d02ae447a4a2",
    glfLabel: "Vedi Menu & Ordina",
    glfNavLabel: "Ordina ora"
  };

  var ICON = {
    phone: '<svg width="{S}" height="{S}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 3.5c.5 0 .9.3 1.1.8l1 2.6c.2.5.1 1-.3 1.4l-1.1 1c-.2.2-.3.5-.1.8a11 11 0 0 0 4.5 4.5c.3.2.6.1.8-.1l1-1.1c.4-.4.9-.5 1.4-.3l2.6 1c.5.2.8.6.8 1.1v2.6c0 .8-.7 1.5-1.5 1.4C9.2 19.9 4.1 14.8 3.5 6.6 3.4 5.8 4.1 5 4.9 5h1.6Z" fill="currentColor"/></svg>',
    burger: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    truck: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="7" cy="17" r="1.7" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="17" r="1.7" stroke="currentColor" stroke-width="1.7"/></svg>',
    pin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2.5c-3.9 0-7 3.1-7 7 0 5 7 12 7 12s7-7 7-12c0-3.9-3.1-7-7-7Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.3" fill="currentColor"/></svg>',
    leaf: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 22V11M12 11c0-3 1.5-5 4.5-6-.3 3-1.8 5-4.5 6Zm0 0C12 8 10.5 6 7.5 5c.3 3 1.8 5 4.5 6Zm0 4c0-2.5 1.3-4 4-5-.3 2.5-1.6 4-4 5Zm0 0c0-2.5-1.3-4-4-5 .3 2.5 1.6 4 4 5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 8.5h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.5v2H8v3h2.5V21h3v-7H16l.5-3h-3V9.2c0-.4.3-.7.7-.7Z" fill="currentColor"/></svg>'
  };

  // Anteprima menù: 5 proposte in evidenza (modificabili qui).
  var TEASER = [
    { n: "Margherita", d: "Pomodoro, fiordilatte, basilico fresco", p: "7,00 €" },
    { n: "Diavola", d: "Pomodoro, fiordilatte, spianata piccante", p: "8,00 €" },
    { n: "Goffee", d: "Cotto, gorgonzola DOP, porcini trifolati", p: "13,50 €" },
    { n: "Parma e Burrata", d: "Crudo di Parma, burrata pugliese, pepe, olio EVO", p: "15,00 €" },
    { n: "Mortazza", d: "Mortadella, cuore di burrata, granella di pistacchio", p: "14,00 €" }
  ];

  function telHref() { return "tel:" + CONFIG.tel.replace(/\s/g, ""); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  // Pulsante ordinazione online GloriaFood, con lo stile del sito (classi .btn).
  function glf(cls, label) {
    return '<a class="' + cls + '" data-glf-cuid="' + esc(CONFIG.glfCuid) + '" data-glf-ruid="' + esc(CONFIG.glfRuid) +
      '" href="https://www.gloriafood.com" rel="nofollow">' + esc(label) + '</a>';
  }

  function navbar() {
    return '' +
      '<header class="gnav" aria-label="Navigazione sito">' +
      '<nav class="gnav__bar">' +
      '<a class="gnav__brand" href="#top" aria-label="Goffee Pizzeria — home"><img src="' + esc(CONFIG.logoSrc) + '" alt="Goffee Pizzeria"></a>' +
      '<div class="gnav__links">' +
      '<a class="gnav__link gnav__link--active" href="#top">Home</a>' +
      '<a class="gnav__link" href="' + esc(CONFIG.menuUrl) + '">Menù</a>' +
      '<a class="gnav__link" href="#contatti">Dove siamo</a>' +
      glf("btn", CONFIG.glfNavLabel) +
      '</div>' +
      '<div class="gnav__actions">' +
      glf("btn", CONFIG.glfNavLabel) +
      '<button class="gnav__toggle" type="button" aria-label="Apri menù" aria-expanded="false">' + ICON.burger + '</button>' +
      '</div>' +
      '</nav></header>';
  }

  function hero() {
    return '' +
      '<section class="hero" id="top">' +
      '<div class="hero__copy reveal">' +
      '<h1 class="hero__title">La pizza che <em>conquista</em> la tua tavola.</h1>' +
      '<p class="hero__sub">Niente fretta, solo lievito e tempo.</p>' +
      '<div class="hero__cta">' +
      glf("btn btn--lg", CONFIG.glfLabel) +
      '<a class="btn btn--lg btn--ghost" href="' + telHref() + '">' + ICON.phone.replace(/\{S\}/g, 18) + ' Chiama — ' + esc(CONFIG.tel) + '</a>' +
      '<a class="btn btn--lg btn--ghost" href="' + esc(CONFIG.menuUrl) + '">Vedi il menù</a>' +
      '</div>' +
      '<div class="hero__chips">' +
      '<span class="chip">' + ICON.truck + 'Consegna <b>a domicilio</b></span>' +
      '<span class="chip">' + ICON.pin + 'Dervio · <b>Lago di Como</b></span>' +
      '<span class="chip">' + ICON.leaf + 'Fatto con <b>❤️</b> e tanta farina</span>' +
      '</div>' +
      '</div>' +
      '<div class="hero__media reveal"><div class="hero__pizza">' +
      '<img src="' + esc(CONFIG.pizzaSrc) + '" alt="Pizza margherita artigianale Goffee vista dall\'alto"></div></div>' +
      '</section>';
  }

  function teaser() {
    var rows = TEASER.map(function (r) {
      return '<div class="prow"><span class="prow__name">' + esc(r.n) + '</span>' +
        '<span class="prow__desc">' + esc(r.d) + '</span>' +
        '<span class="prow__price">' + esc(r.p) + '</span></div>';
    }).join("");
    return '' +
      '<section class="sec" id="menu">' +
      '<div class="menu-head reveal">' +
      '<span class="kicker">Dal nostro forno</span>' +
      '<h2 class="sec__title">Qualche idea dal menù</h2>' +
      '<p class="sec__lead">Dalle classiche di sempre alle Creazioni gourmet. Il menù completo è molto più ricco.</p>' +
      '</div>' +
      '<div class="pizza-list reveal">' + rows + '</div>' +
      '<div class="menu-foot reveal"><a class="btn btn--lg btn--ghost" href="' + esc(CONFIG.menuUrl) + '">Vedi tutto il menù ' + ICON.arrow + '</a></div>' +
      '</section>';
  }

  function footer() {
    return '' +
      '<footer class="foot" id="contatti">' +
      '<div class="foot__in reveal">' +
      '<span class="foot-eyebrow">Goffee · Pizzeria</span>' +
      '<h2 class="foot-title">Ti aspettiamo a Dervio</h2>' +
      '<p class="foot-addr">' + esc(CONFIG.address) + '</p>' +
      '<div class="foot-hours">' +
      '<div><span>Pranzo</span><b>' + esc(CONFIG.hours.lunch) + '</b></div>' +
      '<div><span>Cena</span><b>' + esc(CONFIG.hours.dinner) + '</b></div>' +
      '<div><span>Riposo</span><b>' + esc(CONFIG.hours.closed) + '</b></div>' +
      '</div>' +
      '<div class="foot-cta">' +
      glf("btn btn--lg", CONFIG.glfLabel) +
      '<a class="btn btn--lg btn--ghost" href="' + telHref() + '">' + ICON.phone.replace(/\{S\}/g, 18) + ' Chiama per ordinare</a>' +
      '<a class="btn btn--lg btn--ghost" href="' + esc(CONFIG.mapsUrl) + '" target="_blank" rel="noopener">Indicazioni</a>' +
      '</div></div>' +
      '<div class="foot-legal">' +
      '<small>' + esc(CONFIG.legal) + '</small>' +
      '<div class="foot-social">' +
      '<a href="' + esc(CONFIG.instagram) + '" aria-label="Instagram">' + ICON.instagram + '</a>' +
      '<a href="' + esc(CONFIG.facebook) + '" aria-label="Facebook">' + ICON.facebook + '</a>' +
      '</div></div></footer>';
  }

  function wire(root) {
    var nav = root.querySelector(".gnav");
    var toggle = root.querySelector(".gnav__toggle");
    var links = root.querySelector(".gnav__links");
    if (!nav) return;

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          nav.setAttribute("data-scrolled", String(window.scrollY > 8));
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.getAttribute("data-open") === "true";
        nav.setAttribute("data-open", String(!open));
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.setAttribute("aria-label", open ? "Apri menù" : "Chiudi menù");
      });
    }
    if (links) {
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.setAttribute("data-open", "false");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    root.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 5, 4) * 55) + "ms";
      io.observe(el);
    });
  }

  // Carica lo script di ordinazione GloriaFood (una sola volta) e aggancia i pulsanti.
  function loadGlf() {
    if (document.getElementById("glf-embed-script")) {
      if (typeof window.glfBindButtons === "function") window.glfBindButtons();
      return;
    }
    var s = document.createElement("script");
    s.id = "glf-embed-script";
    s.src = "https://www.fbgcdn.com/embedder/js/ewm2.js";
    s.defer = true; s.async = true;
    document.body.appendChild(s);
  }

  function init() {
    var root = document.querySelector(CONFIG.mount);
    if (!root) { console.error("[Goffee Home] contenitore non trovato:", CONFIG.mount); return; }
    if (root.dataset && root.dataset.menuUrl) CONFIG.menuUrl = root.dataset.menuUrl;
    root.classList.add("goffee-home");
    root.innerHTML = navbar() + hero() + teaser() + footer();
    wire(root);
    loadGlf();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.GoffeeHome = { config: CONFIG, teaser: TEASER };
})();
