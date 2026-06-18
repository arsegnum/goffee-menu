// Componenti + App per il menù Goffee. Caricato come babel dopo React e menu-data.js.
const { useState, useEffect, useRef } = React;

/* ---------- Icone ---------- */
function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ display: "block" }}>
      <path d="M6.5 3.5c.5 0 .9.3 1.1.8l1 2.6c.2.5.1 1-.3 1.4l-1.1 1c-.2.2-.3.5-.1.8a11 11 0 0 0 4.5 4.5c.3.2.6.1.8-.1l1-1.1c.4-.4.9-.5 1.4-.3l2.6 1c.5.2.8.6.8 1.1v2.6c0 .8-.7 1.5-1.5 1.4C9.2 19.9 4.1 14.8 3.5 6.6 3.4 5.8 4.1 5 4.9 5h1.6Z"
        fill="currentColor" />
    </svg>
  );
}

function CallButton({ tel, label, big }) {
  return (
    <a className={"btn" + (big ? " btn--big" : "")} href={"tel:" + tel.replace(/\s/g, "")}>
      <PhoneIcon size={big ? 20 : 18} />
      <span>{label} — <strong>{tel}</strong></span>
    </a>
  );
}

/* ---------- Linea decorativa ---------- */
function Deco({ kind }) {
  if (kind === "nessuna") return null;
  if (kind === "ondulata") {
    return (
      <svg className="deco deco--wave" width="72" height="9" viewBox="0 0 72 9" fill="none" aria-hidden="true">
        <path d="M1 5C7 1 12 1 18 5s11 4 17 0 11-4 17 0 11 4 18 0" stroke="currentColor"
          strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (kind === "puntini") {
    return (
      <span className="deco deco--dots" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} />)}
      </span>
    );
  }
  return <span className="deco deco--line" aria-hidden="true" />;
}

/* ---------- Numeri allergeni ---------- */
function Allerg({ list }) {
  if (!list || !list.length) return null;
  return (
    <span className="allerg" title={"Allergeni: " + list.join(", ")}>
      {list.map((x, i) => <sup key={i}>{x}{i < list.length - 1 ? "," : ""}</sup>)}
    </span>
  );
}

/* ---------- Card pizza ---------- */
function Dish({ item }) {
  return (
    <article className="dish">
      <div className="dish-head">
        <h3 className="dish-name">{item.n}<Allerg list={item.a} /></h3>
        <span className="price">{item.p} €</span>
      </div>
      {item.d ? <p className="desc">{item.d}</p> : null}
    </article>
  );
}

/* ---------- Sezione menù ---------- */
function Section({ s }) {
  return (
    <section className="section" id={s.id}>
      <header className="sec-head">
        {s.kicker ? <span className="sec-kicker">{s.kicker}</span> : null}
        <h2 className="sec-title">{s.titolo}</h2>
        <Deco kind={window.__deco} />
        {s.nota ? <p className="sec-note">{s.nota}</p> : null}
      </header>
      <div className="menu-grid">
        {s.items.map((it, i) => <Dish key={i} item={it} />)}
      </div>
    </section>
  );
}

/* ---------- Bibite & Birre ---------- */
function Drinks({ data, id }) {
  return (
    <section className="section" id={id}>
      <header className="sec-head">
        <span className="sec-kicker">Da bere</span>
        <h2 className="sec-title">{data.titolo}</h2>
        <Deco kind={window.__deco} />
      </header>
      <div className="drinks">
        <ul className="drink-list">
          {data.bibite.map((b, i) => (
            <li key={i}><span className="drink-name">{b.n}</span><span className="dotfill" /><span className="price">{b.p} €</span></li>
          ))}
        </ul>
        <div className="beer">
          <h3 className="beer-title">{data.birre.titolo}</h3>
          <ul className="drink-list">
            {data.birre.items.map((b, i) => (
              <li key={i}>
                <span className="drink-name">{b.n}<Allerg list={b.a} /></span>
                <span className="dotfill" /><span className="price">{b.p} €</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
const TEL = "0341 851178";
const SUB = "Pizze a lunga lievitazione, schiacciate croccanti e un sacco di gusto. Chiamaci e ordina, o fai un salto da noi a Dervio — ti aspettiamo!";

function Hero({ variant }) {
  return (
    <header className="hero" data-variant={variant}>
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Goffee · <span className="hero-place">Pizzeria artigianale, Dervio</span></span>
          <h1 className="hero-title">Menù</h1>
          <p className="hero-sub">{SUB}</p>
          <CallButton tel={TEL} label="Chiama per ordinare" big />
        </div>
        {variant === "foto" ? (
          <div className="hero-photo" role="img" aria-label="Foto pizza (placeholder)">
            <span className="photo-tag">foto pizza</span>
          </div>
        ) : null}
      </div>
    </header>
  );
}

/* ---------- Allergeni legenda ---------- */
function AllergeniBox({ list }) {
  return (
    <div className="allerg-box">
      <p className="allerg-intro">I numeri accanto a ogni pizza indicano gli allergeni presenti. Per intolleranze o allergie chiedi sempre al personale.</p>
      <ul className="allerg-legend">
        {list.map(([n, name]) => (
          <li key={n}><b>{n}</b> {name}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Nav chip ---------- */
const NAV = [
  { id: "classiche", label: "Classiche" },
  { id: "speciali", label: "Speciali" },
  { id: "margherita", label: "Margherita" },
  { id: "pala", label: "Pala Romana" },
  { id: "bibite", label: "Bibite & Birre" }
];

function Nav({ active }) {
  return (
    <nav className="chips" aria-label="Sezioni del menù">
      <a className="chips-brand" href="#" style={{textDecoration:"none"}}>Goffee</a>
      <div className="chips-scroll">
        {NAV.map((n) => (
          <a key={n.id} href={"#" + n.id} className={"chip" + (active === n.id ? " chip--active" : "")}>{n.label}</a>
        ))}
      </div>
      <span className="nav-cta"><a className="btn" href={"tel:" + TEL.replace(/\s/g, "")}><PhoneIcon size={15} />Chiama</a></span>
    </nav>
  );
}

/* ---------- App ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "centrato",
  "card": "bordo",
  "deco": "nessuna",
  "titleFont": "Fraunces",
  "accent": "#C0612F"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("classiche");
  window.__deco = t.deco; // letto da Section/Drinks al render

  // scrollspy
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id)];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const fontFam = t.titleFont === "Playfair"
    ? "'Playfair Display', Georgia, serif"
    : "'Fraunces', Georgia, serif";

  return (
    <div className="page" data-hero={t.hero} data-card={t.card} data-deco={t.deco}
      style={{ "--font-title": fontFam, "--accent": t.accent }}>
      <Nav active={active} />
      <Hero variant={t.hero} />

      <main className="wrap">
        <AllergeniBox list={window.MENU.allergeni} />
        {window.MENU.sezioni.map((s) => <Section key={s.id} s={s} />)}
        <Drinks data={window.MENU.bibite} id="bibite" />
      </main>

      <footer className="foot" id="contatti">
        <div className="foot-inner">
          <span className="foot-eyebrow">Goffee · Pizzeria artigianale</span>
          <h2 className="foot-title">Ti aspettiamo a Dervio</h2>
          <p className="foot-addr">Via Martiri della Liberazione 20 · Dervio (LC)</p>
          <div className="foot-hours">
            <div><span>Pranzo</span><b>11:30 – 14:00</b></div>
            <div><span>Cena</span><b>17:30 – 22:00</b></div>
            <div><span>Riposo</span><b>Lunedì chiuso</b></div>
          </div>
          <CallButton tel={TEL} label="Chiama per ordinare" big />
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Testata" />
        <TweakRadio label="Stile hero" value={t.hero}
          options={["centrato", "editoriale", "foto"]}
          onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Card pizza" />
        <TweakRadio label="Stile card" value={t.card}
          options={["bordo", "rilievo", "piatto"]}
          onChange={(v) => setTweak("card", v)} />
        <TweakSection label="Decorazioni" />
        <TweakRadio label="Linea sezione" value={t.deco}
          options={["linea", "ondulata", "puntini", "nessuna"]}
          onChange={(v) => setTweak("deco", v)} />
        <TweakSection label="Tipografia & colore" />
        <TweakRadio label="Font titoli" value={t.titleFont}
          options={["Fraunces", "Playfair"]}
          onChange={(v) => setTweak("titleFont", v)} />
        <TweakColor label="Accento" value={t.accent}
          options={["#C0612F", "#B23A2E", "#A8632B", "#8C5A3C", "#9C6B2E"]}
          onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
