/* ============================================================================
   Goffee — Pagina "Tavolo" (QR): il cliente sceglie la lingua e va dritto al
   menù (nella lingua scelta). Le istruzioni "come ordinare" sono nel menù.
   Si monta in un contenitore #goffee-table-root.
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    mount: "#goffee-table-root",
    menuUrl: "/menu",                 // pagina del menù (override: data-menu-url)
    logoSrc: "https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v30/dist/goffee-logo.png",
    storageKey: "goffee-lang"         // stessa chiave del menù → la lingua si mantiene
  };

  var LANGS = [
    ["it", "Italiano", "🇮🇹"],
    ["en", "English", "🇬🇧"],
    ["de", "Deutsch", "🇩🇪"],
    ["fr", "Français", "🇫🇷"]
  ];

  var T = {
    place: "Dervio · Lago di Como",
    welcome: "Benvenuto",
    langPick: "Lingua · Language · Sprache · Langue",
    table: "Tavolo"
  };

  var tableNo = "";

  var CHEVRON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var root;

  function render() {
    var buttons = LANGS.map(function (l) {
      return '<button type="button" class="gt-lang" data-lang="' + l[0] + '">' +
        '<span class="gt-flag" aria-hidden="true">' + l[2] + '</span>' +
        '<span class="gt-lang-name">' + esc(l[1]) + '</span>' +
        '<span class="gt-chevron">' + CHEVRON + '</span></button>';
    }).join("");
    var tableBadge = tableNo ? '<div class="gt-table">' + esc(T.table) + ' <b>' + esc(tableNo) + '</b></div>' : "";
    root.innerHTML =
      '<div class="gt-wrap">' +
      '<img class="gt-logo" src="' + esc(CONFIG.logoSrc) + '" alt="Goffee Pizzeria">' +
      '<div class="gt-eyebrow">' + esc(T.place) + '</div>' +
      '<h1 class="gt-h1">' + esc(T.welcome) + '</h1>' +
      tableBadge +
      '<div class="gt-choose-label">' + esc(T.langPick) + '</div>' +
      '<div class="gt-langs" role="group" aria-label="Lingua / Language">' + buttons + '</div>' +
      '</div>';
    root.querySelectorAll(".gt-lang").forEach(function (b) {
      b.addEventListener("click", function () { pick(b.getAttribute("data-lang")); });
    });
  }

  // Salva la lingua (che il menù riuserà) e apre il menù, inoltrando il tavolo (?t=).
  function pick(code) {
    try { localStorage.setItem(CONFIG.storageKey, code); } catch (e) {}
    try { document.documentElement.lang = code; } catch (e) {}
    var url = CONFIG.menuUrl;
    if (tableNo) url += (url.indexOf("?") === -1 ? "?" : "&") + "t=" + encodeURIComponent(tableNo);
    window.location.href = url;
  }

  function init() {
    root = document.querySelector(CONFIG.mount);
    if (!root) { console.error("[Goffee Tavolo] contenitore non trovato:", CONFIG.mount); return; }
    if (root.dataset && root.dataset.menuUrl) CONFIG.menuUrl = root.dataset.menuUrl;
    try {
      var tq = new URLSearchParams(location.search).get("t");
      if (tq) tableNo = tq.replace(/[^0-9A-Za-z]/g, "").slice(0, 4);
    } catch (e) {}
    root.classList.add("goffee-table");
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.GoffeeTable = { config: CONFIG };
})();
