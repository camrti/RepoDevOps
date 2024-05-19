require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const researcherRoute = require('./src/researcher/researcherRoute.js');
const publicationRoute = require('./src/publication/publicationRoute.js');
const publicationRoute2 = require('./src/publication2/publicationRoute2.js');
//const researcher = require('./src/database/researcherModel'); decommentare se si vuole usare la funzione in fondo

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory
app.set('views', 'src/views');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware per il parsing del corpo della richiesta
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve i file statici dalla directory 'public'
app.use(express.static('public'));

// Usa le route definite in researcherRoute
app.use('/', researcherRoute);

// Usa le route definite in publicationRoute
app.use('/scopus/', publicationRoute);

// Usa le route definite in publicationRoute
app.use('/scholar/', publicationRoute2);

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});

/* Funzione che parte quando viene avviata l'app per inserire a mano un researcher con i parametridel modello attuale
async function funzione(){
    let x = {
        fascia: "baba",
        nome: "ciccio",
        cognome: "sasiccio",
        genere: "maschio",
        ateneo: "unisa",
        facolta: "agaga",
        ssd: "ssd",
        sc: "scsc",
        struttura: "macheneso",
        servizio_altro_ateneo: "boh"
    };
    const r = await researcher.create(x).catch((err) => { return reject(err); });
    console.log(r);
}
funzione();
*/