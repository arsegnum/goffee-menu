/* ============================================================================
   Goffee — Menù · versione production self-contained (vanilla JS, 0 dipendenze)
   Ricostruisce fedelmente il prototipo React (menu-app.jsx) con il design scelto:
     card = "linee", hero = "centrato", accento = #D6452B.
   Multilingua IT / EN / DE / FR. Si monta in un contenitore #goffee-menu-root.

   PER WEBFLOW: vedi WEBFLOW.md. Le uniche cose da personalizzare sono qui sotto
   (telefono, indirizzo, orari, URL del logo).
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------- CONFIG ----------------------------------- */
  var CONFIG = {
    mount: "#goffee-menu-root",      // contenitore in cui montare il menù
    // URL CSV del Foglio Google pubblicato (File → Condividi → Pubblica sul web → CSV).
    // Lasciato vuoto: usa i dati interni qui sotto. Quando lo imposti, il menù legge
    // pizze/bevande dal foglio (con i dati interni come riserva se il foglio non risponde).
    sheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThNwBuz4gscLhPB419NcA7kD7_Av_03YRx-UC23z0yadYu_K2dSZ86q7izFLE9EskY6sFm07XBzQRU/pub?gid=1000921760&single=true&output=csv",
    tel: "0341 851178",              // telefono mostrato e usato per tel:
    // Indirizzo della home sul sito (per i link "Home" / brand / "Dove siamo" della navbar).
    homeUrl: "/",
    logoSrc: "https://cdn.jsdelivr.net/gh/arsegnum/goffee-menu@v30/dist/goffee-logo.png",
    address: "Via Martiri della Liberazione 20 · Dervio (LC)",
    hours: { lunch: "11:30 – 14:00", dinner: "18:00 – 22:00" },
    card: "linee",                   // carte | linee | spaziate
    hero: "centrato",                // centrato | sfondo | foto
    accent: "#D6452B",
    heroBg: "hero-pizza.jpg",        // usato solo se hero === "sfondo"
    storageKey: "goffee-lang",
    legal: "© 2026 Goffee - Pizzeria. Tutti i diritti riservati. Fatto con ❤️ e tanta farina.",
    // Dati aziendali (ragione sociale + P.IVA) e link privacy. Compila legalInfo con i tuoi dati.
    // Override da snippet: data-legal="…" e data-privacy-url="/privacy".
    legalInfo: "",
    privacyUrl: "/privacy",
    instagram: "#",
    facebook: "#",
    // Ordinazione online: pagina di ordinazione (GloriaFood/Foodbooking)
    orderUrl: "https://www.foodbooking.com/api/fb/_q_jn_z_v",
    // Link recensione Google. Default: scheda ESATTA di Goffee via CID (identificatore
    // canonico Google della scheda). Per aprire direttamente la finestra recensione,
    // metti il link "scrivi recensione" (g.page/r/…/review) con data-review-url="…".
    reviewUrl: "https://www.google.com/maps?cid=17017661356589761011",
    glfLabel: "Vedi Menu & Ordina",
    glfNavLabel: "Ordina ora"
  };

  /* ------------------------------ DATI ------------------------------------ */
  var MENU = {
    allergeni: [
      [1, "Arachidi"], [2, "Frutta a guscio"], [3, "Latte e derivati"], [4, "Molluschi"],
      [5, "Pesce"], [6, "Sesamo"], [7, "Soia"], [8, "Crostacei"], [9, "Glutine"],
      [10, "Lupini"], [11, "Senape"], [12, "Sedano"], [13, "Solfiti"], [14, "Uova"]
    ],
    sezioni: [
      {
        id: "classiche", kicker: "Le nostre pizze", titolo: "Classiche", nota: "",
        items: [
          { n: "Marinara", p: "6,50", a: [9], d: "Pomodoro, origano, aglio, olio extravergine d'oliva" },
          { n: "Würstel", p: "7,00", a: [3, 9], d: "Pomodoro, fiordilatte, würstel" },
          { n: "Funghi", p: "8,00", a: [3, 9], d: "Pomodoro, fiordilatte, funghi champignons" },
          { n: "Naja", p: "8,50", a: [3, 9], d: "Pomodoro, fiordilatte, patatine fritte" },
          { n: "Napoli", p: "8,00", a: [3, 5, 9], d: "Pomodoro, fiordilatte, acciughe, origano" },
          { n: "Prosciutto", p: "9,00", a: [3, 9], d: "Pomodoro, fiordilatte, prosciutto cotto" },
          { n: "Diavola", p: "8,00", a: [3, 9], d: "Pomodoro, fiordilatte, spianata piccante" },
          { n: "Quattro Formaggi", p: "12,00", a: [3, 9], d: "Pomodoro, fiordilatte, gorgonzola, taleggio, grana" },
          { n: "Quattro Stagioni", p: "12,00", a: [3, 9], d: "Pomodoro, fiordilatte, prosciutto cotto, funghi champignons, carciofi, olive" },
          { n: "Tonno e Cipolla", p: "9,50", a: [3, 5, 9], d: "Pomodoro, fiordilatte, tonno, cipolla di Tropea" },
          { n: "Boscaiola", p: "12,00", a: [3, 9], d: "Pomodoro, fiordilatte, salsiccia, funghi porcini" },
          { n: "Romana", p: "10,00", a: [3, 5, 9], d: "Pomodoro, fiordilatte, acciughe, capperi, olive, origano" },
          { n: "Vegetariana", p: "10,00", a: [3, 9], d: "Pomodoro, fiordilatte, verdure di stagione" },
          { n: "Messicana", p: "12,00", a: [3, 9], d: "Pomodoro, fiordilatte, spianata piccante, salsiccia, pancetta, peperoncino" },
          { n: "Affumicata", p: "11,00", a: [3, 9], d: "Pomodoro, fiordilatte, provola affumicata, pancetta" },
          { n: "Speck e Zola", p: "11,00", a: [3, 9], d: "Pomodoro, fiordilatte, speck, gorgonzola" }
        ]
      },
      {
        id: "speciali", kicker: "Le nostre pizze", titolo: "Creazioni", nota: "",
        items: [
          { n: "Parma e Burrata", p: "15,00", a: [3, 9], fresh: true, d: "Pomodoro, fiordilatte, crudo di Parma, burrata pugliese, pepe, olio EVO" },
          { n: "Parmigiana", p: "11,00", a: [3, 9], d: "Crema di melanzane, fiordilatte, gocce di pomodoro, melanzane fritte, scaglie di Grana Padano, olio al basilico" },
          { n: "Della Casa", p: "13,00", a: [3, 9], d: "Speck IGP, brie, pomodoro, fiordilatte, funghi porcini trifolati" },
          { n: "Mortazza", p: "14,00", a: [2, 3, 9], d: "Pomodoro, fiordilatte, mortadella, cuore di burrata, granella di pistacchio" },
          { n: "Salsiccia e Friarielli", p: "12,50", a: [3, 9], d: "Salsiccia, pomodoro, fiordilatte, cime di rapa condite con aglio e peperoncino" },
          { n: "Goffee", p: "13,50", a: [3, 9], d: "Prosciutto cotto, pomodoro, fiordilatte, gorgonzola DOP, porcini trifolati" },
          { n: "Freska", p: "11,50", a: [3, 9], d: "Pomodoro, cuore di burrata, pomodorini confit, basilico" },
          { n: "Patate e Rosmarino", p: "8,50", a: [3, 9], d: "Fiordilatte, patate al forno, rosmarino, sale e olio EVO" },
          { n: "Bresaola e Caprino", p: "11,50", a: [3, 9], fresh: true, d: "Bresaola, caprino, pomodoro, fiordilatte, scaglie di Grana Padano" },
          { n: "'Nduja e Stracciatella", p: "12,50", a: [3, 9], d: "Pomodoro, 'nduja calabrese, stracciatella di burrata" },
          { n: "Pomodorini e Rucola", p: "9,00", a: [3, 9], fresh: true, d: "Pomodoro, fiordilatte, pomodorino fresco rosso e rucola" },
          { n: "Valtellinese", p: "12,00", a: [3, 9], fresh: true, d: "Bresaola, pomodoro, fiordilatte, funghi porcini trifolati" },
          { n: "Per Se", p: "14,00", a: [3, 5, 9], d: "Salsa di datterino giallo, stracciatella di burrata, acciughe, zest di limone, \"pepe\" di Sichuan" },
          { n: "Norma", p: "13,00", a: [3, 9], d: "Pomodoro, fiordilatte, melanzane fritte, ricotta salata grattugiata, basilico" }
        ]
      },
      {
        id: "margherita", kicker: "Sei varianti", titolo: "Margherita Mood", nota: "Sei modi per dire Margherita.",
        items: [
          { n: "Margherita Classica", p: "7,00", a: [3, 9], d: "Pomodoro, fiordilatte, basilico fresco" },
          { n: "Margherita DOP", p: "11,00", a: [3, 9], d: "Pomodoro, mozzarella di bufala DOP fuori cottura, pomodorino rosso in cottura, basilico, olio EVO" },
          { n: "Margherita Extra", p: "8,00", a: [3, 9], d: "Pomodoro, fiordilatte, Grana Padano in cottura, basilico" },
          { n: "Pomod'oro", p: "12,50", a: [3, 9], d: "Salsa di datterini gialli, cuore di burrata, basilico" },
          { n: "Margherita Confit", p: "10,00", a: [3, 9], d: "Fiordilatte, pomodorini rossi e gialli confit, olio al basilico" },
          { n: "Margherita del Cilento", p: "9,00", a: [3, 9], d: "Pomodoro, fiordilatte, pomodorini confit, scaglie di cacioricotta di capra del Cilento, zest di limone" }
        ]
      },
      {
        id: "pala", kicker: "", titolo: "Pala Romana & Co.", nota: "Leggera, croccante fuori e soffice dentro.",
        items: [
          { n: "Emilia-Romagna", p: "9,00", a: [2, 3, 9, 13], d: "Stracciatella, granella di pistacchio, mortadella, aceto balsamico di Modena IGP" },
          { n: "Come una Caprese", p: "9,00", a: [3, 9], d: "Pomodoro a fette, mozzarella di bufala, olio al basilico" },
          { n: "Delicato", p: "8,50", a: [3, 9], d: "Stracciatella di burrata, prosciutto cotto, rucola, pomodorini confit" },
          { n: "Diavola", p: "8,00", a: [3, 9], d: "Spianata piccante, stracciatella di burrata, rucola" },
          { n: "Crudo e Mozzarella", p: "9,00", a: [3, 9], d: "Prosciutto crudo di Parma, fiordilatte, rucola, pomodori confit e olio EVO" },
          { n: "Nocciolata", p: "7,00", a: [2, 9], d: "Nocciole tostate, crema di nocciole e zucchero a velo" }
        ]
      }
    ],
    bibite: {
      titolo: "Bibite & Birre",
      bibite: [
        { n: "Acqua naturale / gassata", p: "1,50" },
        { n: "Coca-Cola", p: "2,50" },
        { n: "Coca-Cola classica (vetro)", p: "3,00" },
        { n: "Coca-Cola Zero (vetro)", p: "3,00" },
        { n: "Fanta", p: "2,50" },
        { n: "Sprite", p: "2,50" },
        { n: "Fuzetea Pesca", p: "2,50" },
        { n: "Fuzetea Limone", p: "2,50" },
        { n: "Lurisia Limonata", p: "3,50" },
        { n: "Lurisia Aranciata", p: "3,50" },
        { n: "Lurisia Gazzosa", p: "3,50" },
        { n: "Lurisia Chinotto", p: "3,50" }
      ],
      birreStd: {
        titolo: "Birre",
        items: [
          { n: "Moretti 33cl", p: "3,00", a: [9] },
          { n: "Moretti 66cl", p: "4,00", a: [9] },
          { n: "Moretti FAF 33cl", p: "4,00", a: [9] },
          { n: "Messina Vivace 33cl", p: "4,00", a: [9] },
          { n: "Ichnusa 33cl", p: "4,00", a: [9] },
          { n: "Fisher 65cl", p: "5,00", a: [9] },
          { n: "Heineken analcolica 33cl", p: "4,00", a: [9] }
        ]
      },
      birre: {
        titolo: "Birre artigianali del Birrificio Legnone",
        items: [
          { n: "Jack IPA 33cl", p: "4,50", a: [9] },
          { n: "Spiga di Legno 33cl", p: "4,50", a: [9] },
          { n: "Milf Passion 33cl", p: "4,50", a: [9] },
          { n: "Testa di Malto 33cl", p: "4,50", a: [9] }
        ]
      }
    }
  };

  var I18N = {
    langs: [["it", "IT"], ["en", "EN"], ["de", "DE"], ["fr", "FR"]],
    ui: {
      it: {
        heroSub: "Ci sentiamo fortunati a fare parte dei tuoi momenti speciali. Dedica qualche istante a esplorare le idee che abbiamo preparato per sorprenderti.",
        call: "Chiama per ordinare", callShort: "Chiama",
        heroPlace: "Dervio · Lago di Como",
        drinkKicker: "Da bere",
        allergTop: "Le nostre proposte potrebbero contenere allergeni. In caso di intolleranze, ti preghiamo di comunicarlo al momento dell'ordine.",
        allergMore: "Maggiori informazioni",
        tableLabel: "Sei al tavolo",
        filter: { placeholder: "Cerca una pizza…", all: "Tutte", veg: "Vegetariane", spicy: "Piccanti", fav: "Preferiti", none: "Nessun risultato. Prova con un'altra ricerca.", clear: "Cancella" },
        reviewTitle: "Ti è piaciuto?", reviewSub: "Lasciaci una recensione su Google: per noi conta moltissimo.", reviewCta: "Lascia una recensione",
      dineTitle: "Come funziona il servizio al tavolo",
      dineSteps: [["Ordina alla cassa", "con nome e numero del tavolo"], ["Alle pizze ci pensiamo noi", "te le portiamo al tavolo"], ["Le bevande", "le ritiri al banco"]],
        freshNote: "Alcuni ingredienti freschi sono serviti a parte, da aggiungere a casa per gustarli al meglio.",
        allergIntro: "Accanto a ciascun prodotto trovi un numero che indica il tipo di allergene presente.",
        notePrezzi: "Tutti i prezzi sono espressi in euro (€).",
        noteStar: "* Alcuni prodotti possono essere surgelati all'origine o congelati in loco mediante abbattitore rapido di temperatura.",
        note1: "I nostri impasti per la pizza vengono preparati nei nostri laboratori. Realizzati con materie prime selezionate, vengono sottoposti a un rapido abbattimento e conservati a -18 °C. Questo processo ci consente di garantire una qualità costante e il controllo in ogni fase.",
        note2: "Durante le operazioni di preparazione dei cibi esiste la possibilità che prodotti alimentari privi di glutine vengano a contatto con preparazioni che ne contengono. Per queste circostanze non siamo in grado di garantire che una pietanza segnalata priva di glutine sia completamente esente da contaminazione. Grazie per la collaborazione.",
        note3: "Per qualsiasi informazione sulla presenza di sostanze che possono provocare allergie e intolleranze è possibile consultare l'apposita documentazione, fornita su richiesta dal personale in servizio. Per maggiori informazioni rivolgersi al personale di sala.",
        footEyebrow: "Goffee · Pizzeria",
        footTitle: "Ti aspettiamo a Dervio",
        lunch: "Pranzo", dinner: "Cena", rest: "Riposo", closed: "Lunedì chiuso",
        nav: { classiche: "Classiche", speciali: "Creazioni", margherita: "Margherita", pala: "Focaccia", bibite: "Bibite & Birre" },
        allergeni: ["Arachidi", "Frutta a guscio", "Latte e derivati", "Molluschi", "Pesce", "Sesamo", "Soia", "Crostacei", "Glutine", "Lupini", "Senape", "Sedano", "Solfiti", "Uova"]
      },
      en: {
        heroSub: "We feel lucky to be part of your special moments. Take a moment to explore the ideas we've prepared to surprise you.",
        call: "Call to order", callShort: "Call",
        heroPlace: "Dervio · Lago di Como",
        drinkKicker: "To drink",
        allergTop: "Our dishes may contain allergens. If you have any intolerances, please let us know when ordering.",
        allergMore: "More information",
        tableLabel: "You're at table",
        filter: { placeholder: "Search a pizza…", all: "All", veg: "Vegetarian", spicy: "Spicy", fav: "Favourites", none: "No results. Try another search.", clear: "Clear" },
        reviewTitle: "Did you enjoy it?", reviewSub: "Leave us a review on Google — it means a lot to us.", reviewCta: "Leave a review",
      dineTitle: "How table service works",
      dineSteps: [["Order at the counter", "with your name and table number"], ["Leave the pizzas to us", "we bring them to your table"], ["Drinks", "collect them at the counter"]],
        freshNote: "Some fresh ingredients are served separately, to add at home so you enjoy them at their best.",
        allergIntro: "Next to each item you'll find a number indicating the allergen present.",
        notePrezzi: "All prices are in euros (€).",
        noteStar: "* Some products may be deep-frozen at source or blast-chilled on site using a rapid temperature reduction.",
        note1: "Our pizza doughs are prepared in our own workshops. Made with selected ingredients, they are blast-chilled and kept at -18 °C. This process lets us guarantee consistent quality and control at every stage.",
        note2: "During food preparation, gluten-free products may come into contact with preparations that contain gluten. Because of this, we cannot guarantee that any dish marked gluten-free is completely free of contamination. Thank you for your understanding.",
        note3: "For any information on substances that may cause allergies or intolerances, the relevant documentation is available on request from our staff. For more information, please ask the dining-room staff.",
        footEyebrow: "Goffee · Pizzeria",
        footTitle: "We look forward to seeing you in Dervio",
        lunch: "Lunch", dinner: "Dinner", rest: "Closed", closed: "Closed on Mondays",
        nav: { classiche: "Classics", speciali: "Creations", margherita: "Margherita", pala: "Focaccia", bibite: "Drinks & Beers" },
        allergeni: ["Peanuts", "Tree nuts", "Milk & dairy", "Molluscs", "Fish", "Sesame", "Soy", "Crustaceans", "Gluten", "Lupin", "Mustard", "Celery", "Sulphites", "Eggs"]
      },
      de: {
        heroSub: "Wir fühlen uns glücklich, Teil deiner besonderen Momente zu sein. Nimm dir einen Augenblick Zeit und entdecke, womit wir dich überraschen möchten.",
        call: "Zum Bestellen anrufen", callShort: "Anrufen",
        heroPlace: "Dervio · Lago di Como",
        drinkKicker: "Zum Trinken",
        allergTop: "Unsere Gerichte können Allergene enthalten. Bei Unverträglichkeiten teile es uns bitte bei der Bestellung mit.",
        allergMore: "Mehr Informationen",
        tableLabel: "Du sitzt an Tisch",
        filter: { placeholder: "Pizza suchen…", all: "Alle", veg: "Vegetarisch", spicy: "Scharf", fav: "Favoriten", none: "Keine Ergebnisse. Versuch eine andere Suche.", clear: "Löschen" },
        reviewTitle: "Hat es geschmeckt?", reviewSub: "Bewerte uns auf Google — das bedeutet uns sehr viel.", reviewCta: "Bewertung schreiben",
      dineTitle: "So funktioniert der Tischservice",
      dineSteps: [["An der Kasse bestellen", "mit Name und Tischnummer"], ["Um die Pizzen kümmern wir uns", "wir bringen sie an den Tisch"], ["Getränke", "an der Theke abholen"]],
        freshNote: "Einige frische Zutaten werden separat serviert, um sie zu Hause hinzuzufügen und in bester Qualität zu genießen.",
        allergIntro: "Neben jedem Produkt findest du eine Nummer, die das enthaltene Allergen angibt.",
        notePrezzi: "Alle Preise verstehen sich in Euro (€).",
        noteStar: "* Einige Produkte können am Ursprung tiefgefroren oder vor Ort mit einem Schnellkühler schockgefrostet sein.",
        note1: "Unsere Pizzateige werden in unseren eigenen Werkstätten zubereitet. Aus ausgewählten Zutaten hergestellt, werden sie schockgekühlt und bei -18 °C gelagert. So gewährleisten wir gleichbleibende Qualität und Kontrolle in jedem Schritt.",
        note2: "Bei der Zubereitung der Speisen können glutenfreie Produkte mit glutenhaltigen Zubereitungen in Kontakt kommen. Aus diesem Grund können wir nicht garantieren, dass ein als glutenfrei gekennzeichnetes Gericht völlig frei von Kontamination ist. Danke für Ihr Verständnis.",
        note3: "Für Informationen zu Stoffen, die Allergien oder Unverträglichkeiten auslösen können, liegt auf Anfrage entsprechende Dokumentation bei unserem Personal bereit. Für weitere Informationen wenden Sie sich bitte an das Servicepersonal.",
        footEyebrow: "Goffee · Pizzeria",
        footTitle: "Wir freuen uns auf dich in Dervio",
        lunch: "Mittag", dinner: "Abend", rest: "Ruhetag", closed: "Montags geschlossen",
        nav: { classiche: "Klassiker", speciali: "Kreationen", margherita: "Margherita", pala: "Focaccia", bibite: "Getränke & Biere" },
        allergeni: ["Erdnüsse", "Schalenfrüchte", "Milch & Milchprodukte", "Weichtiere", "Fisch", "Sesam", "Soja", "Krebstiere", "Gluten", "Lupinen", "Senf", "Sellerie", "Sulfite", "Eier"]
      },
      fr: {
        heroSub: "Nous nous sentons chanceux de faire partie de vos moments spéciaux. Prenez un instant pour explorer les idées que nous avons préparées pour vous surprendre.",
        call: "Appelez pour commander", callShort: "Appeler",
        heroPlace: "Dervio · Lago di Como",
        drinkKicker: "À boire",
        allergTop: "Nos propositions peuvent contenir des allergènes. En cas d'intolérances, merci de nous le signaler au moment de la commande.",
        allergMore: "Plus d'informations",
        tableLabel: "Vous êtes à la table",
        filter: { placeholder: "Rechercher une pizza…", all: "Toutes", veg: "Végétariennes", spicy: "Épicées", fav: "Favoris", none: "Aucun résultat. Essayez une autre recherche.", clear: "Effacer" },
        reviewTitle: "Vous avez aimé ?", reviewSub: "Laissez-nous un avis sur Google — ça compte énormément pour nous.", reviewCta: "Laisser un avis",
      dineTitle: "Comment fonctionne le service à table",
      dineSteps: [["Commandez à la caisse", "avec nom et numéro de table"], ["Les pizzas, on s'en occupe", "on vous les apporte à table"], ["Boissons", "à récupérer au comptoir"]],
        freshNote: "Certains ingrédients frais sont servis à part, à ajouter à la maison pour les savourer au mieux.",
        allergIntro: "À côté de chaque produit figure un numéro indiquant l'allergène présent.",
        notePrezzi: "Tous les prix sont indiqués en euros (€).",
        noteStar: "* Certains produits peuvent être surgelés à l'origine ou congelés sur place au moyen d'une cellule de refroidissement rapide.",
        note1: "Nos pâtes à pizza sont préparées dans nos ateliers. Élaborées à partir de matières premières sélectionnées, elles sont surgelées rapidement et conservées à -18 °C. Ce procédé nous permet de garantir une qualité constante et le contrôle à chaque étape.",
        note2: "Lors de la préparation des plats, des produits sans gluten peuvent entrer en contact avec des préparations qui en contiennent. Pour cette raison, nous ne pouvons pas garantir qu'un plat signalé sans gluten soit totalement exempt de contamination. Merci de votre compréhension.",
        note3: "Pour toute information sur les substances pouvant provoquer des allergies ou des intolérances, la documentation correspondante est disponible sur demande auprès de notre personnel. Pour plus d'informations, adressez-vous au personnel de salle.",
        footEyebrow: "Goffee · Pizzeria",
        footTitle: "Nous vous attendons à Dervio",
        lunch: "Déjeuner", dinner: "Dîner", rest: "Fermé", closed: "Fermé le lundi",
        nav: { classiche: "Classiques", speciali: "Créations", margherita: "Margherita", pala: "Focaccia", bibite: "Boissons & Bières" },
        allergeni: ["Arachides", "Fruits à coque", "Lait & dérivés", "Mollusques", "Poisson", "Sésame", "Soja", "Crustacés", "Gluten", "Lupin", "Moutarde", "Céleri", "Sulfites", "Œufs"]
      }
    },
    secTitoli: {
      margherita: { it: "Margherita Mood", en: "Margherita Mood", de: "Margherita Mood", fr: "Margherita Mood" },
      pala: { it: "Focaccia & Co.", en: "Focaccia & Co.", de: "Focaccia & Co.", fr: "Focaccia & Co." }
    },
    sezioni: {
      margherita: {
        it: { kicker: "Sei varianti", nota: "Sei modi per dire Margherita." },
        en: { kicker: "Six variations", nota: "Six ways to say Margherita." },
        de: { kicker: "Sechs Varianten", nota: "Sechs Arten, Margherita zu sagen." },
        fr: { kicker: "Six variantes", nota: "Six façons de dire Margherita." }
      },
      pala: {
        it: { kicker: "", nota: "Leggera, croccante fuori e soffice dentro." },
        en: { kicker: "", nota: "Light, crisp outside and soft inside." },
        de: { kicker: "", nota: "Leicht, außen knusprig, innen weich." },
        fr: { kicker: "", nota: "Légère, croustillante dehors et moelleuse dedans." }
      }
    },
    desc: {
      "Marinara": { en: "Tomato, oregano, garlic, extra-virgin olive oil", de: "Tomate, Oregano, Knoblauch, natives Olivenöl extra", fr: "Tomate, origan, ail, huile d'olive extra-vierge" },
      "Würstel": { en: "Tomato, fiordilatte, frankfurter", de: "Tomate, Fiordilatte, Würstchen", fr: "Tomate, fiordilatte, saucisse de Francfort" },
      "Naja": { en: "Tomato, fiordilatte, fries", de: "Tomate, Fiordilatte, Pommes frites", fr: "Tomate, fiordilatte, frites" },
      "Romana": { en: "Tomato, fiordilatte, anchovies, capers, olives, oregano", de: "Tomate, Fiordilatte, Sardellen, Kapern, Oliven, Oregano", fr: "Tomate, fiordilatte, anchois, câpres, olives, origan" },
      "Messicana": { en: "Tomato, fiordilatte, spicy spianata salami, sausage, pancetta, chilli", de: "Tomate, Fiordilatte, scharfe Spianata-Salami, Wurst, Pancetta, Chili", fr: "Tomate, fiordilatte, spianata piquante, saucisse, pancetta, piment" },
      "Affumicata": { en: "Tomato, fiordilatte, smoked provola, pancetta", de: "Tomate, Fiordilatte, geräucherte Provola, Pancetta", fr: "Tomate, fiordilatte, provola fumée, pancetta" },
      "Speck e Zola": { en: "Tomato, fiordilatte, speck, gorgonzola", de: "Tomate, Fiordilatte, Speck, Gorgonzola", fr: "Tomate, fiordilatte, speck, gorgonzola" },
      "Margherita": { en: "Tomato, fiordilatte, fresh basil", de: "Tomate, Fiordilatte, frisches Basilikum", fr: "Tomate, fiordilatte, basilic frais" },
      "Margherita DOP": { en: "Tomato, DOP buffalo mozzarella added after baking, red cherry tomato baked in, basil, EVO oil", de: "Tomate, DOP-Büffelmozzarella nach dem Backen, rote Kirschtomate beim Backen, Basilikum, natives Olivenöl", fr: "Tomate, mozzarella de bufflonne DOP hors cuisson, tomate cerise rouge en cuisson, basilic, huile d'olive" },
      "Napoli": { en: "Tomato, fiordilatte, anchovies, oregano", de: "Tomate, Fiordilatte, Sardellen, Oregano", fr: "Tomate, fiordilatte, anchois, origan" },
      "Funghi": { en: "Tomato, fiordilatte, champignon mushrooms", de: "Tomate, Fiordilatte, Champignons", fr: "Tomate, fiordilatte, champignons de Paris" },
      "Prosciutto": { en: "Tomato, fiordilatte, cooked ham", de: "Tomate, Fiordilatte, Kochschinken", fr: "Tomate, fiordilatte, jambon cuit" },
      "Prosciutto e Funghi": { en: "Tomato, fiordilatte, cooked ham, mushrooms", de: "Tomate, Fiordilatte, Kochschinken, Champignons", fr: "Tomate, fiordilatte, jambon cuit, champignons" },
      "Diavola": { en: "Tomato, fiordilatte, spicy spianata salami", de: "Tomate, Fiordilatte, scharfe Spianata-Salami", fr: "Tomate, fiordilatte, spianata piquante" },
      "Quattro Stagioni": { en: "Tomato, fiordilatte, cooked ham, champignon mushrooms, artichokes, olives", de: "Tomate, Fiordilatte, Kochschinken, Champignons, Artischocken, Oliven", fr: "Tomate, fiordilatte, jambon cuit, champignons, artichauts, olives" },
      "Quattro Formaggi": { en: "Tomato, fiordilatte, gorgonzola, taleggio, grana", de: "Tomate, Fiordilatte, Gorgonzola, Taleggio, Grana", fr: "Tomate, fiordilatte, gorgonzola, taleggio, grana" },
      "Wurstel e Patatine": { en: "Tomato, fiordilatte, frankfurter, fries", de: "Tomate, Fiordilatte, Wiener Würstchen, Pommes", fr: "Tomate, fiordilatte, saucisse, frites" },
      "Tonno e Cipolla": { en: "Tomato, fiordilatte, tuna, Tropea onion", de: "Tomate, Fiordilatte, Thunfisch, Tropea-Zwiebel", fr: "Tomate, fiordilatte, thon, oignon de Tropea" },
      "Vegetariana": { en: "Tomato, fiordilatte, seasonal vegetables", de: "Tomate, Fiordilatte, Saisongemüse", fr: "Tomate, fiordilatte, légumes de saison" },
      "Boscaiola": { en: "Tomato, fiordilatte, sausage, porcini mushrooms", de: "Tomate, Fiordilatte, Wurst, Steinpilze", fr: "Tomate, fiordilatte, saucisse, cèpes" },
      "Parma e Burrata": { en: "Tomato, fiordilatte, Parma cured ham, Apulian burrata, pepper, EVO oil", de: "Tomate, Fiordilatte, Parmaschinken, apulische Burrata, Pfeffer, natives Olivenöl", fr: "Tomate, fiordilatte, jambon de Parme, burrata des Pouilles, poivre, huile d'olive" },
      "Mortazza": { en: "Tomato, fiordilatte, mortadella, burrata heart, crushed pistachio", de: "Tomate, Fiordilatte, Mortadella, Burrata-Herz, Pistazienkrokant", fr: "Tomate, fiordilatte, mortadelle, cœur de burrata, éclats de pistache" },
      "Per Se": { en: "Yellow datterini sauce, burrata stracciatella, anchovies, lemon zest, Sichuan \"pepper\"", de: "Gelbe Datterini-Sauce, Burrata-Stracciatella, Sardellen, Zitronenzeste, Sichuan-„Pfeffer\"", fr: "Sauce de datterini jaunes, stracciatella de burrata, anchois, zeste de citron, « poivre » de Sichuan" },
      "Patate e Rosmarino": { en: "Fiordilatte, oven-baked potatoes, rosemary, salt and EVO oil", de: "Fiordilatte, Ofenkartoffeln, Rosmarin, Salz und natives Olivenöl", fr: "Fiordilatte, pommes de terre au four, romarin, sel et huile d'olive" },
      "Salsiccia e Friarielli": { en: "Sausage, tomato, fiordilatte, turnip tops with garlic and chilli", de: "Wurst, Tomate, Fiordilatte, Stängelkohl mit Knoblauch und Chili", fr: "Saucisse, tomate, fiordilatte, friarielli à l'ail et au piment" },
      "Parmigiana": { en: "Aubergine cream, fiordilatte, tomato drops, fried aubergine, Grana Padano shavings, basil oil", de: "Auberginencreme, Fiordilatte, Tomatentupfen, frittierte Aubergine, Grana-Padano-Späne, Basilikumöl", fr: "Crème d'aubergine, fiordilatte, gouttes de tomate, aubergine frite, copeaux de Grana Padano, huile au basilic" },
      "'Nduja e Stracciatella": { en: "Tomato, Calabrian 'nduja, burrata stracciatella", de: "Tomate, kalabrische 'Nduja, Burrata-Stracciatella", fr: "Tomate, 'nduja calabraise, stracciatella de burrata" },
      "Freska": { en: "Tomato, burrata heart, confit cherry tomatoes, basil", de: "Tomate, Burrata-Herz, Confit-Kirschtomaten, Basilikum", fr: "Tomate, cœur de burrata, tomates cerises confites, basilic" },
      "Della Casa": { en: "IGP speck, brie, tomato, fiordilatte, sautéed porcini mushrooms", de: "IGP-Speck, Brie, Tomate, Fiordilatte, sautierte Steinpilze", fr: "Speck IGP, brie, tomate, fiordilatte, cèpes sautés" },
      "Goffee": { en: "Cooked ham, tomato, fiordilatte, DOP gorgonzola, sautéed porcini", de: "Kochschinken, Tomate, Fiordilatte, DOP-Gorgonzola, sautierte Steinpilze", fr: "Jambon cuit, tomate, fiordilatte, gorgonzola DOP, cèpes sautés" },
      "Bresaola e Caprino": { en: "Bresaola, goat cheese, tomato, fiordilatte, Grana Padano shavings", de: "Bresaola, Ziegenkäse, Tomate, Fiordilatte, Grana-Padano-Späne", fr: "Bresaola, fromage de chèvre, tomate, fiordilatte, copeaux de Grana Padano" },
      "Norma": { en: "Tomato, fiordilatte, fried aubergine, grated salted ricotta, basil", de: "Tomate, Fiordilatte, frittierte Aubergine, geriebener Salzricotta, Basilikum", fr: "Tomate, fiordilatte, aubergine frite, ricotta salée râpée, basilic" },
      "Valtellinese": { en: "Bresaola, tomato, fiordilatte, sautéed porcini mushrooms", de: "Bresaola, Tomate, Fiordilatte, sautierte Steinpilze", fr: "Bresaola, tomate, fiordilatte, cèpes sautés" },
      "Pomodorini e Rucola": { en: "Tomato, fiordilatte, fresh red cherry tomatoes and rocket", de: "Tomate, Fiordilatte, frische rote Kirschtomaten und Rucola", fr: "Tomate, fiordilatte, tomates cerises rouges fraîches et roquette" },
      "Margherita Classica": { en: "Tomato, fiordilatte, fresh basil", de: "Tomate, Fiordilatte, frisches Basilikum", fr: "Tomate, fiordilatte, basilic frais" },
      "Margherita Extra": { en: "Tomato, fiordilatte, Grana Padano added while baking, basil", de: "Tomate, Fiordilatte, Grana Padano beim Backen, Basilikum", fr: "Tomate, fiordilatte, Grana Padano en cuisson, basilic" },
      "Pomod'oro": { en: "Yellow datterini sauce, burrata heart, basil", de: "Gelbe Datterini-Sauce, Burrata-Herz, Basilikum", fr: "Sauce de datterini jaunes, cœur de burrata, basilic" },
      "Margherita Confit": { en: "Fiordilatte, red & yellow confit cherry tomatoes, basil oil", de: "Fiordilatte, rote & gelbe Confit-Kirschtomaten, Basilikumöl", fr: "Fiordilatte, tomates cerises confites rouges et jaunes, huile au basilic" },
      "Margherita del Cilento": { en: "Tomato, fiordilatte, confit cherry tomatoes, Cilento goat cacioricotta shavings, lemon zest", de: "Tomate, Fiordilatte, Confit-Kirschtomaten, Cilento-Ziegen-Cacioricotta, Zitronenzeste", fr: "Tomate, fiordilatte, tomates cerises confites, copeaux de cacioricotta de chèvre du Cilento, zeste de citron" },
      "Emilia-Romagna": { en: "Stracciatella, crushed pistachio, mortadella, IGP Modena balsamic vinegar", de: "Stracciatella, Pistazienkrokant, Mortadella, IGP-Balsamico aus Modena", fr: "Stracciatella, éclats de pistache, mortadelle, vinaigre balsamique de Modène IGP" },
      "Come una Caprese": { en: "Sliced tomato, buffalo mozzarella, basil oil", de: "Tomatenscheiben, Büffelmozzarella, Basilikumöl", fr: "Tomate en tranches, mozzarella de bufflonne, huile au basilic" },
      "Delicato": { en: "Burrata stracciatella, cooked ham, rocket, confit cherry tomatoes", de: "Burrata-Stracciatella, Kochschinken, Rucola, Confit-Kirschtomaten", fr: "Stracciatella de burrata, jambon cuit, roquette, tomates cerises confites" },
      "Crudo e Mozzarella": { en: "Parma cured ham, fiordilatte, rocket, confit tomatoes and EVO oil", de: "Parmaschinken, Fiordilatte, Rucola, Confit-Tomaten und natives Olivenöl", fr: "Jambon cru de Parme, fiordilatte, roquette, tomates confites et huile d'olive" },
      "Nocciolata": { en: "Toasted hazelnuts, hazelnut cream and icing sugar", de: "Geröstete Haselnüsse, Haselnusscreme und Puderzucker", fr: "Noisettes torréfiées, crème de noisette et sucre glace" }
    },
    birreTitolo: {
      it: "Birre artigianali del Birrificio Legnone",
      en: "Craft beers from Birrificio Legnone",
      de: "Craft-Biere des Birrificio Legnone",
      fr: "Bières artisanales du Birrificio Legnone"
    },
    birreStdTitolo: { it: "Birre", en: "Beers", de: "Biere", fr: "Bières" }
  };

  /* --------------------------- HELPERS ------------------------------------ */
  var NAV_IDS = ["classiche", "speciali", "margherita", "pala", "bibite"];
  var LANG_NAMES = { it: "Italiano", en: "English", de: "Deutsch", fr: "Français" };
  var LANG_LABEL = { it: "Lingua", en: "Language", de: "Sprache", fr: "Langue" };
  var ORDER_I18N = {
    it: { cta: "Ordina ora", title: "Come vuoi ordinare?", online: "Ordina online", close: "Chiudi" },
    en: { cta: "Order now", title: "How would you like to order?", online: "Order online", close: "Close" },
    de: { cta: "Jetzt bestellen", title: "Wie möchtest du bestellen?", online: "Online bestellen", close: "Schließen" },
    fr: { cta: "Commander", title: "Comment souhaitez-vous commander ?", online: "Commander en ligne", close: "Fermer" }
  };

  var GLOBE_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" stroke-width="2"/></svg>';
  var IG_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>';
  var FB_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 8.5h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.5v2H8v3h2.5V21h3v-7H16l.5-3h-3V9.2c0-.4.3-.7.7-.7Z" fill="currentColor"/></svg>';
  var DINE_ICONS = [
    // scontrino / cassa — centrato in (12,12)
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h10v17l-2.5-1.4L12 20.5l-2.5-1.4L7 20.5V3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 8.2h5M9.5 12h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    // servizio al tavolo (posate) — centrato in (12,12)
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 3v4.5a2 2 0 0 0 4 0V3M8.5 3v18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.5 3v18M17.5 3c-2 .5-3.3 2.7-3.3 5.5 0 2.4 1.2 4.3 3.3 4.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    // bicchiere / bevande — centrato in (12,12)
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4.5h10l-1 14.2a1.6 1.6 0 0 1-1.6 1.5H9.6A1.6 1.6 0 0 1 8 18.7L7 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.4 9h9.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  ];

  var SEARCH_SVG =
    '<svg class="gfilter__ic" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var HEART_SVG =
    '<svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 4.6 12.9a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 1 1 6.5 6.5L12 20.3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  var GOOGLE_G_SVG =
    '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12.1c-.2 1.8-1.6 4.6-4.5 6.4l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.3 2.2-7.6 2.2-5.8 0-10.8-3.9-12.5-9.3l-7.1 5.5C8 40.3 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.5 28.2c-.5-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2l-7.1-5.5C2.9 17.1 2 20.4 2 24s.9 6.9 2.4 9.7l7.1-5.5z"/><path fill="#EA4335" d="M24 10.5c3.3 0 5.5 1.4 6.7 2.6l5.9-5.8C33 3.9 28.8 2 24 2 15.4 2 8 7.7 4.4 15.3l7.1 5.5c1.7-5.4 6.7-10.3 12.5-10.3z"/></svg>';
  var STAR_SVG =
    '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 18l-5.9 3.1 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" fill="#F5A623"/></svg>';

  // Riconoscimento tag (vegetariana / piccante) da nome+ingredienti in italiano.
  // Override espliciti possibili dal Foglio Google: colonne veg / piccante (true/false).
  var MEAT_RE = /w[üu]rstel|prosciutt|\bcotto\b|\bcrudo\b|salsicc|spianata|pancett|speck|bresaol|mortadell|nduja|salame|guancial|acciugh|tonno|salmon|\bpesce\b|carne|pollo|\bwurst\b|porchett|salumi/i;
  var SPICY_RE = /piccant|diavol|nduja|peperoncin|messican|arrabbiat/i;
  function deriveTags(item) {
    var hay = (item.n + " " + (item.d || "")).toLowerCase();
    return {
      veg: (typeof item.veg === "boolean") ? item.veg : !MEAT_RE.test(hay),
      spicy: (typeof item.spicy === "boolean") ? item.spicy : SPICY_RE.test(hay)
    };
  }

  /* --------------------------- PREFERITI ---------------------------------- */
  var favSet = [];
  function readFavs() {
    try { var a = JSON.parse(localStorage.getItem("goffee-fav") || "[]"); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function saveFavs() { try { localStorage.setItem("goffee-fav", JSON.stringify(favSet)); } catch (e) {} }
  function isFav(n) { return favSet.indexOf(n) !== -1; }
  function toggleFav(n) {
    var i = favSet.indexOf(n);
    if (i === -1) favSet.push(n); else favSet.splice(i, 1);
    saveFavs();
  }

  // Fascia: come ordinare quando si è seduti al tavolo — 3 passi con icone.
  function dineBand(ui) {
    var steps = (ui.dineSteps || []).map(function (s, i) {
      return '<div class="dine-step"><span class="dine-ic">' + (DINE_ICONS[i] || "") + '</span>' +
        '<p><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></p></div>';
    }).join("");
    var badge = tableNo
      ? '<div class="dine-table"><span class="dine-table__ic" aria-hidden="true">🍽️</span>' +
        '<span class="dine-table__txt">' + esc(ui.tableLabel) + ' <b>' + esc(tableNo) + '</b></span></div>'
      : "";
    return '<div class="dine-note"><div class="dine-note__in">' + badge +
      '<span class="dine-note__kicker">' + esc(ui.dineTitle) + '</span>' +
      '<div class="dine-steps">' + steps + '</div></div></div>';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function desc(name, original, lang) {
    if (lang === "it") return original;
    var d = I18N.desc[name];
    return (d && d[lang]) || original;
  }

  var PHONE_SVG =
    '<svg width="{S}" height="{S}" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="display:block">' +
    '<path d="M6.5 3.5c.5 0 .9.3 1.1.8l1 2.6c.2.5.1 1-.3 1.4l-1.1 1c-.2.2-.3.5-.1.8a11 11 0 0 0 4.5 4.5c.3.2.6.1.8-.1l1-1.1c.4-.4.9-.5 1.4-.3l2.6 1c.5.2.8.6.8 1.1v2.6c0 .8-.7 1.5-1.5 1.4C9.2 19.9 4.1 14.8 3.5 6.6 3.4 5.8 4.1 5 4.9 5h1.6Z" fill="currentColor"/></svg>';

  var FRESH_SVG =
    '<span class="fresh-mark" aria-label="ingrediente fresco servito a parte" title="Ingrediente fresco servito a parte">' +
    '<svg width="14" height="15" viewBox="0 0 24 26" fill="none" aria-hidden="true">' +
    '<path d="M12 3C8 7.5 7.5 15 12 20.5C16.5 15 16 7.5 12 3Z" fill="currentColor"/>' +
    '<path d="M12 23V7M12 11.5L9 9.5M12 11.5L15 9.5M12 15.5L9.6 13.8M12 15.5L14.4 13.8" stroke="var(--bg)" stroke-width="1.1" stroke-linecap="round"/></svg></span>';

  function callButton(ui, big, ghost) {
    var tel = CONFIG.tel.replace(/\s/g, "");
    return '<a class="btn' + (big ? " btn--big" : "") + (ghost ? " btn--ghost" : "") + '" href="tel:' + esc(tel) + '">' +
      PHONE_SVG.replace(/\{S\}/g, big ? 19 : 17) +
      '<span>' + esc(ui.call) + ' — <strong>' + esc(CONFIG.tel) + '</strong></span></a>';
  }

  // Pulsante "Ordina ora": apre la finestra con la scelta (online / chiama).
  function orderTrigger(cls) {
    var o = ORDER_I18N[currentLang] || ORDER_I18N.it;
    return '<button type="button" class="' + cls + ' order-trigger">' + esc(o.cta) + '</button>';
  }

  // Riga pulsante ordina (centrata) per hero e footer.
  function ctaRow() {
    return '<div class="cta-row">' + orderTrigger("btn btn--big") + '</div>';
  }

  // Finestra di scelta: Ordina online (foodbooking) oppure Chiama (telefono).
  function orderModal(ui) {
    var o = ORDER_I18N[currentLang] || ORDER_I18N.it;
    var tel = CONFIG.tel.replace(/\s/g, "");
    return '<div class="ord-modal" role="dialog" aria-modal="true" aria-label="' + esc(o.title) + '">' +
      '<div class="ord-backdrop"></div>' +
      '<div class="ord-card">' +
      '<button type="button" class="ord-close" aria-label="' + esc(o.close) + '">×</button>' +
      '<h3 class="ord-title">' + esc(o.title) + '</h3>' +
      '<div class="ord-actions">' +
      '<a class="btn btn--big ord-opt" href="' + esc(CONFIG.orderUrl) + '" target="_blank" rel="noopener">' + esc(o.online) + '</a>' +
      '<a class="btn btn--big btn--ghost ord-opt" href="tel:' + esc(tel) + '">' + PHONE_SVG.replace(/\{S\}/g, 18) + '<span>' + esc(ui.call) + ' — ' + esc(CONFIG.tel) + '</span></a>' +
      '</div></div></div>';
  }

  // span allergeni con tooltip (numeri localizzati nel testo del popup)
  function allerg(list, names) {
    if (!list || !list.length) return "";
    var txt = list.map(function (x) { return names[x - 1]; }).filter(Boolean).join(", ");
    var sup = list.map(function (x, i) {
      return "<sup>" + x + (i < list.length - 1 ? "," : "") + "</sup>";
    }).join("");
    return '<span class="allerg" role="button" tabindex="0" aria-label="Allergeni: ' + esc(txt) + '">' +
      sup + '<span class="allerg-pop" role="tooltip">' + esc(txt) + '</span></span>';
  }

  function dish(item, lang, names) {
    var descTxt = item.d ? desc(item.n, item.d, lang) : "";
    var tags = deriveTags(item);
    var fav = isFav(item.n);
    var heart = '<button type="button" class="dish-fav' + (fav ? " is-fav" : "") +
      '" data-fav="' + esc(item.n) + '" aria-pressed="' + fav + '" aria-label="' + esc(item.n) + '">' + HEART_SVG + '</button>';
    var head =
      '<div class="dish-head"><h3 class="dish-name">' + esc(item.n) +
      (item.fresh ? FRESH_SVG : "") + allerg(item.a, names) + '</h3>' +
      '<span class="dish-head__r"><span class="price">' + esc(item.p) + '</span>' + heart + '</span></div>';
    var body = descTxt ? '<p class="desc">' + esc(descTxt) + '</p>' : "";
    var search = (item.n + " " + descTxt).toLowerCase();
    return '<article class="dish" data-name="' + esc(item.n) + '" data-search="' + esc(search) +
      '" data-veg="' + tags.veg + '" data-spicy="' + tags.spicy + '">' + head + body + '</article>';
  }

  function section(s, tone, lang, ui, names) {
    var title = (I18N.secTitoli[s.id] && I18N.secTitoli[s.id][lang]) || ui.nav[s.id] || s.titolo;
    var tr = (I18N.sezioni[s.id] && I18N.sezioni[s.id][lang]) || {};
    var kicker = lang === "it" ? s.kicker : (tr.kicker !== undefined ? tr.kicker : s.kicker);
    var nota = lang === "it" ? s.nota : (tr.nota !== undefined ? tr.nota : s.nota);
    var dishes = s.items.map(function (it) { return dish(it, lang, names); }).join("");
    return '<section class="block" data-tone="' + tone + '" id="' + s.id + '">' +
      '<div class="block__inner"><header class="sec-head">' +
      (kicker ? '<span class="sec-kicker">' + esc(kicker) + '</span>' : "") +
      '<h2 class="sec-title">' + esc(title) + '</h2>' +
      (nota ? '<p class="sec-note">' + esc(nota) + '</p>' : "") +
      '</header><div class="menu-grid">' + dishes + '</div></div></section>';
  }

  function drinkLi(b, lang, names) {
    var nm = desc(b.n, b.n, lang);
    return '<li data-search="' + esc(nm.toLowerCase()) + '"><span class="drink-name">' + esc(nm) + allerg(b.a, names) +
      '</span><span class="dotfill"></span><span class="price">' + esc(b.p) + '</span></li>';
  }

  function drinks(data, tone, lang, ui, names) {
    var beerTitle = I18N.birreTitolo[lang] || data.birre.titolo;
    var beerStdTitle = (I18N.birreStdTitolo && I18N.birreStdTitolo[lang]) || data.birreStd.titolo;
    var bibite = data.bibite.map(function (b) {
      var nm = desc(b.n, b.n, lang);
      return '<li data-search="' + esc(nm.toLowerCase()) + '"><span class="drink-name">' + esc(nm) +
        '</span><span class="dotfill"></span><span class="price">' + esc(b.p) + '</span></li>';
    }).join("");
    var std = data.birreStd.items.map(function (b) { return drinkLi(b, lang, names); }).join("");
    var craft = data.birre.items.map(function (b) { return drinkLi(b, lang, names); }).join("");
    return '<section class="block" data-tone="' + tone + '" id="bibite"><div class="block__inner">' +
      '<header class="sec-head"><span class="sec-kicker">' + esc(ui.drinkKicker) + '</span>' +
      '<h2 class="sec-title">' + esc(ui.nav.bibite) + '</h2></header>' +
      '<div class="drinks"><ul class="drink-list">' + bibite + '</ul>' +
      '<div class="beer"><h3 class="beer-title">' + esc(beerStdTitle) + '</h3>' +
      '<ul class="drink-list">' + std + '</ul>' +
      '<h3 class="beer-title beer-title--craft">' + esc(beerTitle) + '</h3>' +
      '<ul class="drink-list">' + craft + '</ul></div></div></div></section>';
  }

  // Barra ricerca + filtri rapidi (vegetariane / piccanti / preferiti).
  function filterBar(ui) {
    var f = ui.filter;
    var chip = function (id, label) {
      return '<button type="button" class="gfilter-chip' + (currentChip === id ? " gfilter-chip--active" : "") +
        '" data-chip="' + id + '">' + label + '</button>';
    };
    var favHidden = (favSet.length === 0 && currentChip !== "fav") ? " hidden" : "";
    var favChip = '<button type="button" class="gfilter-chip gfilter-fav' + (currentChip === "fav" ? " gfilter-chip--active" : "") +
      '" data-chip="fav"' + favHidden + '><span class="gfilter-heart">♥</span> ' + esc(f.fav) +
      ' <span class="gfilter-count">' + favSet.length + '</span></button>';
    return '<div class="gfilter"><div class="gfilter__in">' +
      '<div class="gfilter__search">' + SEARCH_SVG +
      '<input type="search" class="gfilter__input" placeholder="' + esc(f.placeholder) + '" aria-label="' + esc(f.placeholder) + '" value="' + esc(currentQuery) + '">' +
      '<button type="button" class="gfilter__clear" aria-label="' + esc(f.clear) + '"' + (currentQuery ? "" : " hidden") + '>×</button>' +
      '</div>' +
      '<div class="gfilter__chips">' +
      chip("all", esc(f.all)) +
      chip("veg", "🌱 " + esc(f.veg)) +
      chip("spicy", "🌶️ " + esc(f.spicy)) +
      favChip +
      '</div></div></div>';
  }

  function hero(variant, ui) {
    var bg = variant === "sfondo"
      ? '<img class="hero-bg-img" src="' + esc(CONFIG.heroBg) + '" alt=""><div class="hero-scrim"></div>' : "";
    var photo = variant === "foto"
      ? '<div class="hero-photo" role="img" aria-label="Foto pizza (placeholder)"><span class="photo-tag">foto pizza</span></div>' : "";
    return '<header class="block hero" data-variant="' + variant + '" id="top">' + bg +
      '<div class="block__inner"><div class="hero-copy">' +
      '<span class="eyebrow">' + esc(ui.heroPlace) + '</span>' +
      '<h1 class="hero-title">Menù</h1>' +
      '<p class="hero-sub">' + esc(ui.heroSub) + '</p>' +
      ctaRow(ui) + '</div>' + photo + '</div></header>';
  }

  // Navbar di sito (coerente con la home): Home / Menù / Dove siamo / Ordina ora
  function snav() {
    return '<header class="snav"><nav class="snav__bar" aria-label="Navigazione sito">' +
      '<a class="snav__brand" href="' + esc(CONFIG.homeUrl) + '" aria-label="Goffee Pizzeria — home"><img src="' + esc(CONFIG.logoSrc) + '" alt="Goffee Pizzeria"></a>' +
      '<div class="snav__links">' +
      '<a class="snav__link" href="' + esc(CONFIG.homeUrl) + '">Home</a>' +
      '<a class="snav__link snav__link--active" href="#top">Menù</a>' +
      '<a class="snav__link" href="' + esc(CONFIG.homeUrl) + '#contatti">Dove siamo</a>' +
      orderTrigger("snav__cta") +
      '</div></nav></header>';
  }

  // Pulsante lingua flottante (in basso a destra): globo + lingua, con elenco a comparsa.
  function fnav(lang) {
    var label = LANG_LABEL[lang] || "Lingua";
    var currentPair = I18N.langs.filter(function (p) { return p[0] === lang; })[0] || I18N.langs[0];
    var current = currentPair[1];
    var items = I18N.langs.map(function (pair) {
      var code = pair[0];
      return '<button type="button" class="fnav-item' + (lang === code ? " fnav-item--active" : "") +
        '" data-lang="' + code + '" aria-pressed="' + (lang === code) + '">' + esc(LANG_NAMES[code]) + '</button>';
    }).join("");
    return '<div class="fnav">' +
      '<div class="fnav-backdrop"></div>' +
      '<div class="fnav-sheet" role="dialog" aria-label="' + esc(label) + '">' +
      '<div class="fnav-sheet-head"><span>' + esc(label) + '</span><button type="button" class="fnav-close" aria-label="Chiudi">×</button></div>' +
      '<nav class="fnav-list">' + items + '</nav></div>' +
      '<button type="button" class="fnav-fab" aria-expanded="false" aria-label="' + esc(label) + '">' +
      GLOBE_SVG + '<span>' + esc(current) + '</span></button></div>';
  }

  function noteBox(ui, names) {
    var legend = MENU.allergeni.map(function (pair, i) {
      return '<li><b>' + pair[0] + '</b> ' + esc(names[i]) + '</li>';
    }).join("");
    return '<section class="block note-box" data-tone="white" id="note"><div class="block__inner">' +
      '<p class="allerg-intro">' + esc(ui.allergIntro) + '</p>' +
      '<ul class="allerg-legend">' + legend + '</ul>' +
      '<p class="note-fresh">' + FRESH_SVG + ' ' + esc(ui.freshNote) + '</p>' +
      '<p class="note-prezzi">' + esc(ui.notePrezzi) + '</p>' +
      '<p class="note-star">' + esc(ui.noteStar) + '</p>' +
      '<div class="note-cols"><p>' + esc(ui.note1) + '</p><p>' + esc(ui.note2) + '</p><p>' + esc(ui.note3) + '</p></div>' +
      '</div></section>';
  }

  // Fascia recensione Google (discreta, in fondo al menù).
  function reviewBand(ui) {
    var stars = new Array(5).fill(STAR_SVG).join("");
    return '<section class="block review-band" data-tone="white" id="recensione"><div class="block__inner">' +
      '<div class="rev-stars" aria-hidden="true">' + stars + '</div>' +
      '<p class="rev-title">' + esc(ui.reviewTitle) + '</p>' +
      '<p class="rev-sub">' + esc(ui.reviewSub) + '</p>' +
      '<a class="btn btn--ghost rev-btn" href="' + esc(CONFIG.reviewUrl) + '" target="_blank" rel="noopener">' +
      GOOGLE_G_SVG + '<span>' + esc(ui.reviewCta) + '</span></a>' +
      '</div></section>';
  }

  function footer(ui) {
    return '<footer class="block foot" data-tone="ice" id="contatti"><div class="block__inner">' +
      '<span class="foot-eyebrow">' + esc(ui.footEyebrow) + '</span>' +
      '<h2 class="foot-title">' + esc(ui.footTitle) + '</h2>' +
      '<p class="foot-addr">' + esc(CONFIG.address) + '</p>' +
      '<div class="foot-hours">' +
      '<div><span>' + esc(ui.lunch) + '</span><b>' + esc(CONFIG.hours.lunch) + '</b></div>' +
      '<div><span>' + esc(ui.dinner) + '</span><b>' + esc(CONFIG.hours.dinner) + '</b></div>' +
      '<div><span>' + esc(ui.rest) + '</span><b>' + esc(ui.closed) + '</b></div></div>' +
      ctaRow(ui) + '</div>' +
      '<div class="foot-legal"><div class="foot-legal-txt">' +
      '<small>' + esc(CONFIG.legal) + '</small>' +
      '<small class="foot-biz">' + (CONFIG.legalInfo ? esc(CONFIG.legalInfo) + ' · ' : '') +
      '<a class="foot-link" href="' + esc(CONFIG.privacyUrl) + '">Privacy</a></small></div>' +
      '<div class="foot-social">' +
      '<a href="' + esc(CONFIG.instagram) + '" aria-label="Instagram">' + IG_SVG + '</a>' +
      '<a href="' + esc(CONFIG.facebook) + '" aria-label="Facebook">' + FB_SVG + '</a>' +
      '</div></div></footer>';
  }

  /* ----------------------------- STATO + RENDER --------------------------- */
  var root, currentLang, tableNo = "", currentQuery = "", currentChip = "all";

  function readLang() {
    try {
      var saved = localStorage.getItem(CONFIG.storageKey);
      if (saved && I18N.ui[saved]) return saved;
      var navLang = (navigator.language || "it").slice(0, 2).toLowerCase();
      if (I18N.ui[navLang]) return navLang;
    } catch (e) {}
    return "it";
  }

  function render() {
    var ui = I18N.ui[currentLang];
    var names = ui.allergeni;
    var sez = MENU.sezioni;

    var sections = sez.map(function (s, i) {
      return section(s, i % 2 === 0 ? "white" : "ice", currentLang, ui, names);
    }).join("");
    var drinksTone = sez.length % 2 === 0 ? "white" : "ice";

    root.innerHTML =
      snav() +
      '<div class="page" data-card="' + CONFIG.card + '" style="--accent:' + CONFIG.accent + '">' +
      hero(CONFIG.hero, ui) +
      dineBand(ui) +
      '<div class="block allerg-top" data-tone="white"><div class="block__inner"><p>' +
      esc(ui.allergTop) + ' <a href="#note" class="allerg-more">' + esc(ui.allergMore) + '</a></p></div></div>' +
      filterBar(ui) +
      sections +
      drinks(MENU.bibite, drinksTone, currentLang, ui, names) +
      '<div class="gfilter-empty is-hidden" data-tone="white"><div class="block__inner"><p>' + esc(ui.filter.none) + '</p></div></div>' +
      noteBox(ui, names) +
      reviewBand(ui) +
      footer(ui) +
      '</div>' +
      fnav(currentLang) +
      orderModal(ui);

    wireAllergens();
    wireFnav();
    wireOrder();
    wireFilter();
    wireFavs();
  }

  // Finestra "Ordina": apertura dai pulsanti .order-trigger, chiusura da backdrop/×/scelta.
  function wireOrder() {
    var modal = root.querySelector(".ord-modal");
    if (!modal) return;
    function open() { modal.classList.add("ord-open"); }
    function close() { modal.classList.remove("ord-open"); }
    root.querySelectorAll(".order-trigger").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });
    var bd = modal.querySelector(".ord-backdrop"); if (bd) bd.addEventListener("click", close);
    var x = modal.querySelector(".ord-close"); if (x) x.addEventListener("click", close);
    modal.querySelectorAll(".ord-opt").forEach(function (a) { a.addEventListener("click", close); });
  }

  /* --------------------- RICERCA + FILTRI + PREFERITI --------------------- */
  var PIZZA_IDS = ["classiche", "speciali", "margherita", "pala"];

  function updateFavChip() {
    var chip = root.querySelector(".gfilter-fav");
    if (!chip) return;
    var cnt = chip.querySelector(".gfilter-count");
    if (cnt) cnt.textContent = favSet.length;
    chip.hidden = (favSet.length === 0 && currentChip !== "fav");
  }

  // Applica ricerca testuale + chip attivo a piatti, bevande e sezioni.
  function applyFilter() {
    if (!root) return;
    var q = currentQuery.trim().toLowerCase();
    var chip = currentChip;
    var foodChip = (chip === "veg" || chip === "spicy" || chip === "fav");
    var active = q !== "" || chip !== "all";
    var anyVisible = false;

    root.querySelectorAll(".dish").forEach(function (d) {
      var ok = true;
      if (q) ok = (d.getAttribute("data-search") || "").indexOf(q) !== -1;
      if (ok && chip === "veg") ok = d.getAttribute("data-veg") === "true";
      else if (ok && chip === "spicy") ok = d.getAttribute("data-spicy") === "true";
      else if (ok && chip === "fav") ok = isFav(d.getAttribute("data-name"));
      d.classList.toggle("is-hidden", !ok);
      if (ok) anyVisible = true;
    });

    root.querySelectorAll("#bibite .drink-list li").forEach(function (li) {
      var ok = !foodChip;
      if (ok && q) ok = (li.getAttribute("data-search") || "").indexOf(q) !== -1;
      li.classList.toggle("is-hidden", !ok);
      if (ok) anyVisible = true;
    });

    root.querySelectorAll(".block[id]").forEach(function (sec) {
      var id = sec.id;
      if (PIZZA_IDS.indexOf(id) !== -1) {
        var vis = sec.querySelectorAll(".dish:not(.is-hidden)").length;
        sec.classList.toggle("is-hidden", active && vis === 0);
      } else if (id === "bibite") {
        var visd = sec.querySelectorAll(".drink-list li:not(.is-hidden)").length;
        sec.classList.toggle("is-hidden", active && visd === 0);
      }
    });

    // In modalità ricerca/filtro nascondi le fasce lunghe per dare risalto ai risultati.
    var aux = root.querySelector(".allerg-top");
    if (aux) aux.classList.toggle("is-hidden", active);
    var note = root.querySelector(".note-box");
    if (note) note.classList.toggle("is-hidden", active);

    var es = root.querySelector(".gfilter-empty");
    if (es) es.classList.toggle("is-hidden", !(active && !anyVisible));

    updateFavChip();
  }

  function wireFilter() {
    var bar = root.querySelector(".gfilter");
    if (!bar) return;
    var input = bar.querySelector(".gfilter__input");
    var clear = bar.querySelector(".gfilter__clear");
    if (input) {
      input.addEventListener("input", function () {
        currentQuery = input.value;
        if (clear) clear.hidden = !currentQuery;
        applyFilter();
      });
    }
    if (clear) {
      clear.addEventListener("click", function () {
        currentQuery = "";
        if (input) { input.value = ""; input.focus(); }
        clear.hidden = true;
        applyFilter();
      });
    }
    bar.querySelectorAll(".gfilter-chip").forEach(function (c) {
      c.addEventListener("click", function () {
        var id = c.getAttribute("data-chip");
        currentChip = (currentChip === id && id !== "all") ? "all" : id;
        bar.querySelectorAll(".gfilter-chip").forEach(function (x) {
          x.classList.toggle("gfilter-chip--active", x.getAttribute("data-chip") === currentChip);
        });
        applyFilter();
      });
    });
    applyFilter();
  }

  function wireFavs() {
    root.querySelectorAll(".dish-fav").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        var n = b.getAttribute("data-fav");
        toggleFav(n);
        var on = isFav(n);
        b.classList.toggle("is-fav", on);
        b.setAttribute("aria-pressed", on);
        updateFavChip();
        if (currentChip === "fav") applyFilter();
      });
    });
  }

  /* --------------------------- INTERAZIONI -------------------------------- */
  // Tooltip allergeni: hover (desktop) + tap/click & tastiera (mobile/a11y)
  function wireAllergens() {
    root.querySelectorAll(".allerg").forEach(function (el) {
      el.addEventListener("mouseenter", function () { el.classList.add("allerg--open"); });
      el.addEventListener("mouseleave", function () { el.classList.remove("allerg--open"); });
      el.addEventListener("click", function (e) {
        e.preventDefault();
        el.classList.toggle("allerg--open");
      });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          el.classList.toggle("allerg--open");
        }
      });
    });
  }

  function setLang(code) {
    if (!code || code === currentLang || !I18N.ui[code]) return;
    currentLang = code;
    try { localStorage.setItem(CONFIG.storageKey, code); } catch (e) {}
    document.documentElement.lang = code;
    render();
  }

  // Pulsante lingua flottante: apertura/chiusura foglio + scelta lingua.
  function wireFnav() {
    var fn = root.querySelector(".fnav");
    if (!fn) return;
    var fab = fn.querySelector(".fnav-fab");
    function close() { fn.classList.remove("fnav--open"); if (fab) fab.setAttribute("aria-expanded", "false"); }
    function open() { fn.classList.add("fnav--open"); if (fab) fab.setAttribute("aria-expanded", "true"); }
    if (fab) fab.addEventListener("click", function () {
      fn.classList.contains("fnav--open") ? close() : open();
    });
    var x = fn.querySelector(".fnav-close");
    if (x) x.addEventListener("click", close);
    var bd = fn.querySelector(".fnav-backdrop");
    if (bd) bd.addEventListener("click", close);
    fn.querySelectorAll(".fnav-item").forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });
  }

  /* --------------------- FOGLIO GOOGLE (opzionale) ------------------------ */
  // Parser CSV minimale ma robusto: gestisce campi tra virgolette, virgole e
  // a capo interni, e virgolette doppie raddoppiate ("").
  function parseCSV(text) {
    text = String(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var rows = [], row = [], field = "", inQ = false, i, c;
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (inQ) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
        else field += c;
      } else if (c === '"') { inQ = true; }
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else field += c;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    var headers = (rows.shift() || []).map(function (h) { return h.trim().toLowerCase(); });
    return rows
      .filter(function (r) { return r.some(function (x) { return x.trim() !== ""; }); })
      .map(function (r) {
        var o = {};
        headers.forEach(function (h, idx) { o[h] = r[idx] !== undefined ? r[idx] : ""; });
        return o;
      });
  }

  // Trasforma le righe del foglio nella struttura MENU + traduzioni I18N.
  // Una sezione viene sostituita solo se nel foglio ha almeno una riga, così un
  // foglio incompleto non svuota mai il menù.
  function applySheet(rows) {
    var buckets = { classiche: [], speciali: [], margherita: [], pala: [], bibite: [], birre_std: [], birre_craft: [] };
    rows.forEach(function (r) {
      var s = (r.sezione || "").trim().toLowerCase();
      var nome = (r.nome || "").trim();
      if (!nome || !buckets[s]) return;
      var all = (r.allergeni || "").split(/[^0-9]+/).filter(Boolean).map(Number);
      var item = { n: nome, p: (r.prezzo || "").trim() };
      if (all.length) item.a = all;
      var dit = (r.desc_it || "").trim();
      if (dit) item.d = dit;
      if ((r.fresh || "").trim()) item.fresh = true;
      // traduzioni descrizione → I18N.desc (così desc() le usa come sempre)
      var tr = {};
      ["en", "de", "fr"].forEach(function (l) {
        var v = (r["desc_" + l] || "").trim();
        if (v) tr[l] = v;
      });
      if (Object.keys(tr).length) {
        I18N.desc[nome] = Object.assign({}, I18N.desc[nome], tr);
      }
      buckets[s].push(item);
    });
    MENU.sezioni.forEach(function (sec) {
      if (buckets[sec.id] && buckets[sec.id].length) sec.items = buckets[sec.id];
    });
    if (buckets.bibite.length) MENU.bibite.bibite = buckets.bibite;
    if (buckets.birre_std.length) MENU.bibite.birreStd.items = buckets.birre_std;
    if (buckets.birre_craft.length) MENU.bibite.birre.items = buckets.birre_craft;
  }

  function loadSheet() {
    if (!CONFIG.sheetCsvUrl) return;
    fetch(CONFIG.sheetCsvUrl, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (txt) { applySheet(parseCSV(txt)); render(); })
      .catch(function (e) { console.warn("[Goffee] Foglio non caricato, uso i dati interni:", e); });
  }

  /* ------------------------------ INIT ------------------------------------ */
  function init() {
    root = document.querySelector(CONFIG.mount);
    if (!root) {
      console.error("[Goffee] contenitore non trovato:", CONFIG.mount);
      return;
    }
    var d = root.dataset || {};
    if (d.homeUrl) CONFIG.homeUrl = d.homeUrl;
    if (d.orderUrl) CONFIG.orderUrl = d.orderUrl;
    if (d.reviewUrl) CONFIG.reviewUrl = d.reviewUrl;
    if (d.tel) CONFIG.tel = d.tel;
    if (d.lunch) CONFIG.hours.lunch = d.lunch;
    if (d.dinner) CONFIG.hours.dinner = d.dinner;
    if (d.address) CONFIG.address = d.address;
    if (d.legal) CONFIG.legalInfo = d.legal;
    if (d.privacyUrl) CONFIG.privacyUrl = d.privacyUrl;
    root.classList.add("goffee-menu");
    // Numero del tavolo dal QR (?t=5). In sessione (sessionStorage) così sopravvive
    // alla navigazione interna ma non resta "appiccicato" fra visite diverse.
    try {
      var tq = new URLSearchParams(location.search).get("t");
      if (tq) { tableNo = tq.replace(/[^0-9A-Za-z]/g, "").slice(0, 4); sessionStorage.setItem("goffee-table", tableNo); }
      else { tableNo = sessionStorage.getItem("goffee-table") || ""; }
    } catch (e) {}
    favSet = readFavs();
    currentLang = readLang();
    document.documentElement.lang = currentLang;
    render();        // mostra subito i dati interni (nessuna attesa / nessun vuoto)
    loadSheet();     // se configurato, aggiorna dal Foglio Google e ri-renderizza
    // Esc chiude il foglio lingua flottante
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var fn = root.querySelector(".fnav--open");
        if (fn) {
          fn.classList.remove("fnav--open");
          var fab = fn.querySelector(".fnav-fab");
          if (fab) fab.setAttribute("aria-expanded", "false");
        }
        var m = root.querySelector(".ord-modal.ord-open");
        if (m) m.classList.remove("ord-open");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // esposto per personalizzazione/debug
  window.GoffeeMenu = {
    config: CONFIG, MENU: MENU, I18N: I18N,
    render: function () { if (root) render(); },
    parseCSV: parseCSV, applySheet: applySheet, loadSheet: loadSheet
  };
})();
