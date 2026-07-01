# Mettere la Home Goffee in Webflow

La home è una **pagina intera** (ha già la sua navbar, l'hero con la foto pizza,
l'anteprima del menù e il footer). Quindi va messa su una pagina Webflow **vuota**,
non dentro una pagina che ha già barra di navigazione e footer suoi.

## Snippet (già ospitato, pronto)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v6/dist/goffee-home.css">
<div id="goffee-home-root"></div>
<script src="https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v6/dist/goffee-home.js"></script>
```

## Come integrarla

1. In Webflow crea (o apri) la pagina che vuoi usare come **Home**.
2. Assicurati che la pagina sia **vuota**: se contiene una navbar o un footer di Webflow,
   rimuovili — altrimenti compaiono doppi (questo design ne porta già di propri).
3. Trascina un elemento **Embed** nella pagina e incolla lo snippet qui sopra.
4. **Save** → **Publish**.
5. Per renderla la home del sito: in *Pages*, imposta questa pagina come **Homepage**
   (o lascia il design su una pagina dedicata, a tua scelta).

## Link alla pagina Menù

I pulsanti "Menù" / "Vedi il menù" puntano a **`/untitled`** (la tua attuale pagina del
menù). Se rinomini quella pagina (consigliato: slug `menu`), avvisami e aggiorno il link
(serve una nuova versione `@v3`). In alternativa funziona già così com'è ora.

## Personalizzazioni

Tutto ciò che è modificabile è nel blocco `CONFIG` in cima a `goffee-home.js`
(telefono, link al menù, indirizzo, orari, link mappa, social). Le 5 pizze in vetrina
sono nell'array `TEASER` nello stesso file. Dopo una modifica: commit/push + nuova versione.

## Note

- Il design è fedele all'originale: navbar che si "stacca" allo scroll, hero centrato con
  foto pizza che fluttua, animazioni di comparsa, menù responsive.
- Lo stile è isolato sotto `.goffee-home`, quindi non interferisce col resto del sito.
- Anteprima locale: apri `goffee-home.html` con doppio clic.
</content>
