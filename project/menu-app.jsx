// Componenti + App per il menù Goffee — stile minimalista (Apple), multilingua. Babel, dopo React + menu-data.js + menu-i18n.js.
const { useState, useEffect } = React;

const TEL = "0341 851178";
const LANGS = window.I18N.langs;

/* ---------- Icone ---------- */
function PhoneIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M6.5 3.5c.5 0 .9.3 1.1.8l1 2.6c.2.5.1 1-.3 1.4l-1.1 1c-.2.2-.3.5-.1.8a11 11 0 0 0 4.5 4.5c.3.2.6.1.8-.1l1-1.1c.4-.4.9-.5 1.4-.3l2.6 1c.5.2.8.6.8 1.1v2.6c0 .8-.7 1.5-1.5 1.4C9.2 19.9 4.1 14.8 3.5 6.6 3.4 5.8 4.1 5 4.9 5h1.6Z" fill="currentColor" />
    </svg>);
}

function CallButton({ label, big }) {
  return (
    <a className={"btn" + (big ? " btn--big" : "")} href={"tel:" + TEL.replace(/\s/g, "")}>
      <PhoneIcon size={big ? 19 : 17} />
      <span>{label} — <strong>{TEL}</strong></span>
    </a>);
}

/* ---------- Allergeni inline (toccabili, localizzati) ---------- */
function Allerg({ list, names }) {
  const [open, setOpen] = useState(false);
  if (!list || !list.length) return null;
  const txt = list.map((x) => names[x - 1]).filter(Boolean).join(", ");
  return (
    <span className={"allerg" + (open ? " allerg--open" : "")}
      role="button" tabIndex={0}
      aria-label={"Allergeni: " + txt}
      onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((v) => !v); } }}>
      {list.map((x, i) => <sup key={i}>{x}{i < list.length - 1 ? "," : ""}</sup>)}
      <span className="allerg-pop" role="tooltip">{txt}</span>
    </span>);
}

/* ---------- Helpers traduzione ---------- */
function desc(name, original, lang) {
  if (lang === "it") return original;
  const d = window.I18N.desc[name];
  return (d && d[lang]) || original;
}

/* ---------- Card pizza ---------- */
function FreshMark() {
  return (
    <span className="fresh-mark" aria-label="ingrediente fresco servito a parte" title="Ingrediente fresco servito a parte">
      <svg width="14" height="15" viewBox="0 0 24 26" fill="none" aria-hidden="true">
        <path d="M12 3C8 7.5 7.5 15 12 20.5C16.5 15 16 7.5 12 3Z" fill="currentColor" />
        <path d="M12 23V7M12 11.5L9 9.5M12 11.5L15 9.5M12 15.5L9.6 13.8M12 15.5L14.4 13.8" stroke="var(--bg)" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>);
}

function Dish({ item, lang, names }) {
  return (
    <article className="dish">
      <div className="dish-head">
        <h3 className="dish-name">{item.n}{item.fresh ? <FreshMark /> : null}<Allerg list={item.a} names={names} /></h3>
        <span className="price">{item.p}</span>
      </div>
      {item.d ? <p className="desc">{desc(item.n, item.d, lang)}</p> : null}
    </article>);
}

/* ---------- Sezione menù ---------- */
function Section({ s, tone, lang, ui, names }) {
  const title = (window.I18N.secTitoli && window.I18N.secTitoli[s.id] && window.I18N.secTitoli[s.id][lang]) || ui.nav[s.id] || s.titolo;
  const tr = (window.I18N.sezioni[s.id] && window.I18N.sezioni[s.id][lang]) || {};
  const kicker = lang === "it" ? s.kicker : (tr.kicker !== undefined ? tr.kicker : s.kicker);
  const nota = lang === "it" ? s.nota : (tr.nota !== undefined ? tr.nota : s.nota);
  return (
    <section className="block" data-tone={tone} id={s.id}>
      <div className="block__inner">
        <header className="sec-head">
          {kicker ? <span className="sec-kicker">{kicker}</span> : null}
          <h2 className="sec-title">{title}</h2>
          {nota ? <p className="sec-note">{nota}</p> : null}
        </header>
        <div className="menu-grid">
          {s.items.map((it, i) => <Dish key={i} item={it} lang={lang} names={names} />)}
        </div>
      </div>
    </section>);
}

/* ---------- Bibite & Birre ---------- */
function Drinks({ data, id, tone, lang, ui, names }) {
  const beerTitle = window.I18N.birreTitolo[lang] || data.birre.titolo;
  const beerStdTitle = (window.I18N.birreStdTitolo && window.I18N.birreStdTitolo[lang]) || data.birreStd.titolo;
  return (
    <section className="block" data-tone={tone} id={id}>
      <div className="block__inner">
        <header className="sec-head">
          <span className="sec-kicker">{ui.drinkKicker}</span>
          <h2 className="sec-title">{ui.nav.bibite}</h2>
        </header>
        <div className="drinks">
          <ul className="drink-list">
            {data.bibite.map((b, i) =>
              <li key={i}><span className="drink-name">{desc(b.n, b.n, lang)}</span><span className="dotfill" /><span className="price">{b.p}</span></li>
            )}
          </ul>
          <div className="beer">
            <h3 className="beer-title">{beerStdTitle}</h3>
            <ul className="drink-list">
              {data.birreStd.items.map((b, i) =>
                <li key={i}><span className="drink-name">{desc(b.n, b.n, lang)}<Allerg list={b.a} names={names} /></span><span className="dotfill" /><span className="price">{b.p}</span></li>
              )}
            </ul>
            <h3 className="beer-title beer-title--craft">{beerTitle}</h3>
            <ul className="drink-list">
              {data.birre.items.map((b, i) =>
                <li key={i}><span className="drink-name">{desc(b.n, b.n, lang)}<Allerg list={b.a} names={names} /></span><span className="dotfill" /><span className="price">{b.p}</span></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- Hero ---------- */
function Hero({ variant, ui }) {
  return (
    <header className="block hero" data-variant={variant} id="top">
      {variant === "sfondo" ? <img className="hero-bg-img" src="hero-pizza.jpg" alt="" /> : null}
      {variant === "sfondo" ? <div className="hero-scrim" /> : null}
      <div className="block__inner">
        <div className="hero-copy">
          <span className="eyebrow">{ui.heroPlace}</span>
          <h1 className="hero-title">Menù</h1>
          <p className="hero-sub">{ui.heroSub}</p>
          <CallButton label={ui.call} big />
        </div>
        {variant === "foto" ?
          <div className="hero-photo" role="img" aria-label="Foto pizza (placeholder)">
            <span className="photo-tag">foto pizza</span>
          </div> : null}
      </div>
    </header>);
}

/* ---------- Selettore lingua ---------- */
function LangSwitch({ lang, onPick }) {
  return (
    <div className="lang" role="group" aria-label="Lingua / Language">
      {LANGS.map(([code, label], i) =>
        <React.Fragment key={code}>
          {i > 0 ? <span className="lang-sep" aria-hidden="true">·</span> : null}
          <button type="button"
            className={"lang-btn" + (lang === code ? " lang-btn--active" : "")}
            aria-pressed={lang === code}
            onClick={() => onPick(code)}>{label}</button>
        </React.Fragment>
      )}
    </div>);
}

/* ---------- Nav ---------- */
const NAV_IDS = ["classiche", "speciali", "margherita", "pala", "bibite"];

function Nav({ active, lang, ui, onPick }) {
  return (
    <nav className="nav" aria-label="Menù">
      <a className="nav-brand" href="#top" aria-label="Goffee Pizzeria"><img src="goffee-logo.png" alt="Goffee Pizzeria" /></a>
      <div className="nav-links">
        {NAV_IDS.map((id) =>
          <a key={id} href={"#" + id} className={"nav-link" + (active === id ? " nav-link--active" : "")}>{ui.nav[id]}</a>
        )}
      </div>
      <LangSwitch lang={lang} onPick={onPick} />
    </nav>);
}

/* ---------- App ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "card": "linee",
  "hero": "centrato",
  "accent": "#D6452B"
} /*EDITMODE-END*/;

function readLang() {
  try {
    const saved = localStorage.getItem("goffee-lang");
    if (saved && window.I18N.ui[saved]) return saved;
    const nav = (navigator.language || "it").slice(0, 2).toLowerCase();
    if (window.I18N.ui[nav]) return nav;
  } catch (e) {}
  return "it";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("classiche");
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    try { localStorage.setItem("goffee-lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const ui = window.I18N.ui[lang];
  const names = ui.allergeni;
  const sez = window.MENU.sezioni;

  return (
    <div className="page" data-card={t.card} style={{ "--accent": t.accent }}>
      <Nav active={active} lang={lang} ui={ui} onPick={setLang} />
      <Hero variant={t.hero} ui={ui} />
      <div className="block allerg-top" data-tone="white">
        <div className="block__inner">
          <p>{ui.allergTop} <a href="#note" className="allerg-more">{ui.allergMore}</a></p>
        </div>
      </div>
      {sez.map((s, i) => <Section key={s.id} s={s} tone={i % 2 === 0 ? "white" : "ice"} lang={lang} ui={ui} names={names} />)}
      <Drinks data={window.MENU.bibite} id="bibite" tone={sez.length % 2 === 0 ? "white" : "ice"} lang={lang} ui={ui} names={names} />

      <section className="block note-box" data-tone="white" id="note">
        <div className="block__inner">
          <p className="allerg-intro">{ui.allergIntro}</p>
          <ul className="allerg-legend">
            {window.MENU.allergeni.map(([n], i) => <li key={n}><b>{n}</b> {names[i]}</li>)}
          </ul>
          <p className="note-fresh"><FreshMark /> {ui.freshNote}</p>
          <p className="note-prezzi">{ui.notePrezzi}</p>
          <p className="note-star">{ui.noteStar}</p>
          <div className="note-cols">
            <p>{ui.note1}</p>
            <p>{ui.note2}</p>
            <p>{ui.note3}</p>
          </div>
        </div>
      </section>

      <footer className="block foot" data-tone="ice" id="contatti">
        <div className="block__inner">
          <span className="foot-eyebrow">{ui.footEyebrow}</span>
          <h2 className="foot-title">{ui.footTitle}</h2>
          <p className="foot-addr">Via Martiri della Liberazione 20 · Dervio (LC)</p>
          <div className="foot-hours">
            <div><span>{ui.lunch}</span><b>11:30 – 14:00</b></div>
            <div><span>{ui.dinner}</span><b>17:30 – 22:00</b></div>
            <div><span>{ui.rest}</span><b>{ui.closed}</b></div>
          </div>
          <CallButton label={ui.call} big />
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Card pizza" />
        <TweakRadio label="Stile" value={t.card}
          options={["carte", "linee", "spaziate"]}
          onChange={(v) => setTweak("card", v)} />
        <TweakSection label="Testata" />
        <TweakRadio label="Hero" value={t.hero}
          options={["centrato", "sfondo", "foto"]}
          onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Accento" />
        <TweakColor label="Colore" value={t.accent}
          options={["#D6452B", "#C0392B", "#B23A2E", "#CC4E2A", "#A93226"]}
          onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </div>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
