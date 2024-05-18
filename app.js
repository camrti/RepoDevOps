const express = require('express');
const bodyParser = require('body-parser');
const researcherRoute = require('./researcher/researcherRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Middleware per il parsing del corpo della richiesta
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve i file statici dalla directory 'public'
app.use(express.static('public'));

// Usa le route definite in researcherRoute
app.use('/', researcherRoute);

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
