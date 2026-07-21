# Pagina "Tavolo" (QR) + volantino A6

Pagina di benvenuto per i QR sui tavoli. Il cliente: **sceglie la lingua** → legge
**come ordinare** (alla cassa, con nome e numero del tavolo) → apre il **menù** già
nella lingua scelta. Niente ordinazione online qui.

## 1) Crea la pagina in Webflow

1. In Webflow crea una **pagina nuova vuota** con slug **`tavolo`** (indirizzo finale:
   `…/tavolo`). Deve essere vuota (senza navbar/footer di Webflow).
2. Trascina un elemento **Embed** e incolla:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v11/dist/goffee-table.css">
<div id="goffee-table-root"></div>
<script src="https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v11/dist/goffee-table.js"></script>
```

3. **Publish.** Prova su `coming-soon-goffee.webflow.io/tavolo`.

> La lingua scelta qui si mantiene nel menù (usano la stessa memoria del browser, sullo
> stesso dominio). Il pulsante "Vedi il menù" apre `/menu`; se il menù ha un altro slug,
> nello snippet usa `<div id="goffee-table-root" data-menu-url="/tuo-slug"></div>`.

## 2) QR code

`goffee-qr.svg` (per stampa, vettoriale) e `goffee-qr.png` puntano a
`https://www.pizzeriagoffee.it/tavolo`.

⚠️ Perché lo scan funzioni, la pagina **`/tavolo` dev'essere pubblicata su
`www.pizzeriagoffee.it`**. Se cambi di nuovo dominio/slug, il QR va rigenerato: dimmelo.

## 3) Volantino A6 da stampare

`goffee-a6.html` è il volantino pronto (105×148 mm) con logo + QR + testo, tutto
incorporato (funziona anche offline).

Per stamparlo: apri `goffee-a6.html` nel browser → **Stampa** (Cmd/Ctrl+P) → formato
**A6**, margini **Nessuno** → Stampa o "Salva come PDF". Un foglio = un tavolo (stampane
quanti te ne servono). Se preferisci un altro formato (es. A5 o due A6 per foglio A4),
te lo preparo.

## File
- `goffee-table.css` / `goffee-table.js` — la pagina (embed Webflow)
- `goffee-table.html` — anteprima locale
- `goffee-qr.svg` / `goffee-qr.png` — il codice QR
- `goffee-a6.html` — volantino A6 pronto da stampare
</content>
