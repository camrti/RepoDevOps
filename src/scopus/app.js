const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const route = require('./scopusRoute.js');

const app = express();

app.use('/', route);

const PORT = process.env.SCOPUS_PORT || 8003;
// Avvia il server
app.listen(PORT, () => {
  console.log(`\Scopus service avviato sulla porta ${PORT}`);
});

// To test the route http://localhost:8003/scopus?name=Andrea&surname=Esposito&ateneo=ii

// TEST GIT