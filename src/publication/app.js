const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const publicationRoute2 = require('./publicationRoute.js');

const app = express();

app.use('/', publicationRoute2);

const PORT = process.env.PUBLICATION_PORT || 8002;
// Avvia il server
app.listen(PORT, () => {
  console.log(`\nPublication service avviato sulla porta ${PORT}`);
});

// To test the route http://localhost:8002/parse?ateneo=Catania&name=Giovanni&surname=Russo

// TEST GIT