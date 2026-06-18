// Dati menù Goffee — contenuti d'esempio realistici (da sostituire con i testi reali su Webflow)
window.MENU = {
  allergeni: [
    [1, "Arachidi"], [2, "Frutta a guscio"], [3, "Latte e derivati"], [4, "Molluschi"],
    [5, "Pesce"], [6, "Sesamo"], [7, "Soia"], [8, "Crostacei"], [9, "Glutine"],
    [10, "Lupini"], [11, "Senape"], [12, "Sedano"], [13, "Solfiti"], [14, "Uova"]
  ],
  sezioni: [
    {
      id: "classiche",
      kicker: "Le nostre pizze",
      titolo: "Classiche",
      nota: "",
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
      id: "speciali",
      kicker: "Le nostre pizze",
      titolo: "Creazioni",
      nota: "",
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
      id: "margherita",
      kicker: "Sei varianti",
      titolo: "Margherita Mood",
      nota: "Sei modi per dire Margherita.",
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
      id: "pala",
      kicker: "",
      titolo: "Pala Romana & Co.",
      nota: "Leggera, croccante fuori e soffice dentro.",
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
