/* ============================================================================
   Goffee — Pagina "Tavolo" (QR): il cliente sceglie la lingua, legge come
   ordinare (alla cassa) e apre il menù nella lingua scelta.
   Si monta in un contenitore #goffee-table-root.
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    mount: "#goffee-table-root",
    menuUrl: "/menu",                 // pagina del menù (override: data-menu-url)
    logoSrc: "https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v11/dist/goffee-logo.png",
    storageKey: "goffee-lang"         // stessa chiave del menù → la lingua si mantiene
  };

  var LANGS = [
    ["it", "Italiano", "🇮🇹"],
    ["en", "English", "🇬🇧"],
    ["de", "Deutsch", "🇩🇪"],
    ["fr", "Français", "🇫🇷"]
  ];

  var T = {
    brandWelcome: "Benvenuto da Goffee",
    chooseLang: "Scegli la lingua · Choose your language · Sprache wählen · Choisir la langue",
    howTitle: { it: "Come ordinare", en: "How to order", de: "So bestellst du", fr: "Comment commander" },
    steps: {
      it: [
        "Guarda con calma il nostro menù.",
        "Vieni a ordinare e pagare <b>alla cassa</b>, indicando il tuo <b>nome</b> e il <b>numero del tavolo</b>.",
        "Quando è pronto, <b>ti portiamo il cibo al tavolo</b>.",
        "Le <b>bevande</b> le ritiri direttamente tu alla cassa."
      ],
      en: [
        "Take your time to look at our menu.",
        "Come and order and pay <b>at the counter</b>, giving your <b>name</b> and <b>table number</b>.",
        "When it's ready, <b>we'll bring the food to your table</b>.",
        "<b>Drinks</b> are collected by you directly at the counter."
      ],
      de: [
        "Sieh dir in Ruhe unsere Speisekarte an.",
        "Bestelle und bezahle <b>an der Kasse</b> und nenne deinen <b>Namen</b> und die <b>Tischnummer</b>.",
        "Sobald es fertig ist, <b>bringen wir dir das Essen an den Tisch</b>.",
        "<b>Getränke</b> holst du dir direkt an der Kasse."
      ],
      fr: [
        "Prenez le temps de regarder notre menu.",
        "Venez commander et payer <b>à la caisse</b>, en indiquant votre <b>nom</b> et le <b>numéro de table</b>.",
        "Dès que c'est prêt, <b>nous apportons les plats à votre table</b>.",
        "Les <b>boissons</b> sont à récupérer directement à la caisse."
      ]
    },
    menuBtn: { it: "Vedi il menù", en: "View the menu", de: "Zur Speisekarte", fr: "Voir le menu" },
    changeLang: { it: "Cambia lingua", en: "Change language", de: "Sprache ändern", fr: "Changer de langue" }
  };

  var ARROW =
    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHEVRON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var root, lang = "it";

  function chooseScreen() {
    var buttons = LANGS.map(function (l) {
      return '<button type="button" class="gt-lang" data-lang="' + l[0] + '">' +
        '<span class="gt-flag" aria-hidden="true">' + l[2] + '</span>' +
        '<b>' + esc(l[1]) + '</b><span class="gt-chevron">' + CHEVRON + '</span></button>';
    }).join("");
    return '<div class="gt-screen gt-choose">' +
      '<h1 class="gt-h1">' + esc(T.brandWelcome) + '</h1>' +
      '<p class="gt-sub">' + esc(T.chooseLang) + '</p>' +
      '<div class="gt-langs" role="group" aria-label="Lingua / Language">' + buttons + '</div>' +
      '</div>';
  }

  function instructionsScreen() {
    var steps = (T.steps[lang] || T.steps.it).map(function (s, i) {
      return '<li class="gt-step"><span class="gt-step-n">' + (i + 1) + '</span>' +
        '<span class="gt-step-t">' + s + '</span></li>';
    }).join("");
    return '<div class="gt-screen gt-instructions">' +
      '<h1 class="gt-h1">' + esc(T.howTitle[lang] || T.howTitle.it) + '</h1>' +
      '<ol class="gt-steps">' + steps + '</ol>' +
      '<a class="gt-btn" href="' + esc(CONFIG.menuUrl) + '">' + esc(T.menuBtn[lang] || T.menuBtn.it) + ' ' + ARROW + '</a>' +
      '<button type="button" class="gt-change">' + esc(T.changeLang[lang] || T.changeLang.it) + '</button>' +
      '</div>';
  }

  function render() {
    root.innerHTML =
      '<div class="gt-wrap">' +
      '<img class="gt-logo" src="' + esc(CONFIG.logoSrc) + '" alt="Goffee Pizzeria">' +
      chooseScreen() + instructionsScreen() +
      '</div>';
    wire();
  }

  function setLang(code) {
    lang = code;
    try { localStorage.setItem(CONFIG.storageKey, code); } catch (e) {}
    document.documentElement.lang = code;
    render();
    root.setAttribute("data-step", "instructions");
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  function wire() {
    root.querySelectorAll(".gt-lang").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    var change = root.querySelector(".gt-change");
    if (change) change.addEventListener("click", function () {
      root.setAttribute("data-step", "lang");
      try { window.scrollTo(0, 0); } catch (e) {}
    });
  }

  function init() {
    root = document.querySelector(CONFIG.mount);
    if (!root) { console.error("[Goffee Tavolo] contenitore non trovato:", CONFIG.mount); return; }
    if (root.dataset && root.dataset.menuUrl) CONFIG.menuUrl = root.dataset.menuUrl;
    root.classList.add("goffee-table");
    root.setAttribute("data-step", "lang");   // si parte sempre dalla scelta lingua
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.GoffeeTable = { config: CONFIG, T: T };
})();
