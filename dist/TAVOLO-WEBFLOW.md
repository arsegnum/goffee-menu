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

## 3) Card da tavolo (con numero del tavolo)

Ogni tavolo ha la sua card con il **numero** (il cliente lo dice alla cassa) + il QR.
Niente logo (sul tavolo si sa dove si è). Il QR è lo stesso per tutti (porta a `/tavolo`).

- `goffee-tavoli-a4.html` — **4 card per foglio A4** (3 fogli = 12 tavoli), con linee di taglio. Consigliato: meno carta.
- `goffee-tavoli-a6.html` — **una card A6 intera per pagina** (12 pagine = 12 tavoli).

Stampa: Cmd/Ctrl+P → formato indicato (A4 o A6), scala 100%, margini Predefiniti.
Per cambiare il numero di tavoli, dimmelo e rigenero.

