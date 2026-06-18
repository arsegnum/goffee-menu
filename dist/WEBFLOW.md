# Aggiungere il Menù Goffee al tuo sito Webflow

**Sì, si può fare.** Il menù è stato convertito in una versione *production* leggera, senza
React e senza dipendenze: solo HTML/CSS/JS. Resta multilingua (IT/EN/DE/FR) con il design
scelto (stile righe, hero centrato, accento `#D6452B`).

File in questa cartella `dist/`:

| File | A cosa serve |
|------|--------------|
| `goffee-menu.css` | Lo stile del menù |
| `goffee-menu.js` | Dati + traduzioni + logica (montaggio, lingue, tooltip allergeni) |
| `goffee-menu.html` | Anteprima locale (apri con doppio clic per vedere il risultato) |
| `goffee-menu.singlefile.html` | Tutto in un unico file (utile per iframe / hosting singolo) |
| `goffee-logo.png` | Logo usato in navbar e footer |

> Prima di tutto: apri `goffee-menu.html` nel browser per vedere il menù funzionante.

---

## Passo 0 — Personalizza i tuoi dati (1 minuto)

Apri `goffee-menu.js` e modifica **solo** il blocco `CONFIG` in cima al file:

```js
var CONFIG = {
  tel: "0341 851178",                 // il tuo telefono
  logoSrc: "goffee-logo.png",         // → poi metti qui l'URL del logo caricato su Webflow
  address: "Via Martiri della Liberazione 20 · Dervio (LC)",
  hours: { lunch: "11:30 – 14:00", dinner: "17:30 – 22:00" },
  ...
};
```

I testi delle pizze, le traduzioni, i prezzi e gli allergeni sono nello stesso file
(oggetti `MENU` e `I18N`): modificali lì quando vuoi aggiornare il menù.

---

## Come integrarlo in Webflow

Ci sono tre strade. **Consiglio la A** (più affidabile e veloce da aggiornare).

### A) File ospitati + Embed (consigliato)

I file `.css`/`.js` sono troppo grandi per stare dentro il custom code di una pagina
Webflow (limite ~10.000 caratteri). La soluzione pulita è ospitarli e richiamarli via URL.

1. **Carica il logo** in Webflow: *Assets → Upload*, poi copia l'URL dell'immagine
   (tasto destro → copia link). Incollalo in `CONFIG.logoSrc` dentro `goffee-menu.js`.
2. **Ospita i due file** `goffee-menu.css` e `goffee-menu.js`. Modo gratuito più semplice:
   - crea un repo su GitHub e caricali;
   - richiamali via jsDelivr:
     `https://cdn.jsdelivr.net/gh/UTENTE/REPO@main/dist/goffee-menu.css`
     `https://cdn.jsdelivr.net/gh/UTENTE/REPO@main/dist/goffee-menu.js`
   - (in alternativa va bene qualsiasi hosting statico: Netlify, Cloudflare Pages, ecc.)
3. In Webflow, sulla pagina del menù, trascina un elemento **Embed** dove vuoi che appaia
   il menù e incolla:

   ```html
   <link rel="stylesheet" href="URL_DEL_CSS">
   <div id="goffee-menu-root"></div>
   <script src="URL_DEL_JS"></script>
   ```

4. *(Opzionale)* Il font di base è quello di sistema (Apple/Helvetica); `Inter` è solo
   fallback. Se vuoi forzare Inter, aggiungi in *Page Settings → Inside `<head>`*:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
5. **Pubblica.** Per aggiornare il menù in futuro: modifichi il `.js`, ricarichi il file,
   e (se usi jsDelivr) aggiorni il numero di versione/commit nell'URL per saltare la cache.

### B) Iframe (la più semplice in assoluto)

1. Carica `goffee-menu.singlefile.html` (insieme a `goffee-logo.png`, oppure metti l'URL del
   logo dentro `CONFIG.logoSrc` prima di caricarlo) su un hosting qualsiasi / jsDelivr.
2. In Webflow, elemento **Embed**:
   ```html
   <iframe src="URL_DEL_FILE_HTML" title="Menù Goffee"
           style="width:100%;border:0;min-height:100vh" loading="lazy"></iframe>
   ```
Svantaggio: il menù vive "in una scatola" separata (l'altezza va gestita a mano e gli
ancoraggi `#sezione` restano interni all'iframe). Per un risultato integrato usa la A.

### C) Ricostruzione nativa in Webflow (CMS)

Se in futuro vuoi gestire le pizze dal *CMS* di Webflow (una Collection "Pizze" con campi
nome/prezzo/descrizione/allergeni e una Collection List per pagina), si può ricostruire il
layout con elementi nativi usando questo stesso CSS come riferimento. È più lavoro manuale
nel Designer, ma ti dà l'editing visuale e la localizzazione nativa di Webflow. Dimmi se
vuoi che prepari le classi/struttura per questa strada.

---

## Note

- **Lingue:** lo switch IT/EN/DE/FR funziona via JavaScript e ricorda la scelta
  (`localStorage`). Le traduzioni sono una bozza: falle rivedere a un madrelingua prima
  della pubblicazione (come indicato nel file originale).
- **Hero:** è impostato su `centrato` (solo testo, nessuna foto). Per usare la foto di
  sfondo cambia `CONFIG.hero` in `"sfondo"` e imposta `CONFIG.heroBg` con l'URL di
  `hero-pizza.jpg`.
- **Allergeni:** numeri accanto al piatto; passaci sopra (o tocca su mobile) per la legenda.
</content>
