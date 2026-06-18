# Gestire il menù da un Foglio Google

Il menù può leggere pizze e bevande da un **Foglio Google**: tu modifichi una tabella,
il sito si aggiorna. Funziona su qualsiasi piano Webflow (anche Basic), mantiene le 4
lingue e i tooltip allergeni, e **non cambia** lo snippet già incollato in Webflow.

> I dati interni al menù restano come **riserva**: se il foglio non risponde, il menù
> mostra comunque l'ultima versione inclusa nel codice. Non resta mai vuoto.

## Le colonne del foglio

Il file `goffee-menu-pizze.csv` (in questa cartella) è già compilato con tutte le pizze
e bevande attuali. Colonne:

| Colonna | Cosa contiene | Esempio |
|---------|----------------|---------|
| `sezione` | dove appare la voce | `classiche`, `speciali`, `margherita`, `pala`, `bibite`, `birre_std`, `birre_craft` |
| `nome` | nome del piatto | `Diavola` |
| `prezzo` | prezzo (con la virgola) | `8,00` |
| `allergeni` | numeri della legenda, separati da virgola | `3,9` |
| `fresh` | metti una `x` per la fogliolina "ingrediente fresco" | `x` |
| `desc_it` | descrizione in italiano | `Pomodoro, fiordilatte, spianata piccante` |
| `desc_en` / `desc_de` / `desc_fr` | traduzioni (facoltative) | `Tomato, fiordilatte, spicy salami` |

Per **cambiare** una voce: modifichi la riga. Per **toglierla**: cancelli la riga.
Per **aggiungerne** una: aggiungi una riga (l'ordine delle righe = ordine nel menù).
I numeri allergeni: 1 Arachidi · 2 Frutta a guscio · 3 Latte · 4 Molluschi · 5 Pesce ·
6 Sesamo · 7 Soia · 8 Crostacei · 9 Glutine · 10 Lupini · 11 Senape · 12 Sedano ·
13 Solfiti · 14 Uova.

## Come collegarlo (una volta sola, ~3 minuti)

1. Vai su [sheets.google.com](https://sheets.google.com) → crea un foglio nuovo.
2. **File → Importa → Carica** → seleziona `goffee-menu-pizze.csv`.
   Nella finestra: *Posizione importazione* = «Sostituisci foglio»; *Separatore* = «Virgola»;
   **togli la spunta** a «Converti testo in numeri, date e formule» (così i prezzi tipo
   `6,50` restano esatti).
3. **File → Condividi → Pubblica sul web.**
   - Scheda *Link* → seleziona il foglio (es. «Foglio1») → formato **Valori separati da virgole (.csv)** → **Pubblica**.
   - Copia l'URL che finisce con `output=csv`.
4. Incollami quell'URL: lo inserisco nel menù (`CONFIG.sheetCsvUrl`), faccio commit/push,
   e il sito inizia a leggere dal foglio.

## D'ora in poi

- Cambi una pizza/prezzo nel foglio → salvi → il sito si aggiorna (la cache di Google può
  metterci qualche minuto).
- Lo snippet in Webflow **non si tocca mai più**.
</content>
