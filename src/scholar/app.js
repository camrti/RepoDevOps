const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const scholarRoute = require('./scholarRoute.js');

const app = express();

app.use('/', scholarRoute);

const PORT = process.env.SCHOLAR_PORT || 8002;
// Avvia il server
app.listen(PORT, () => {
  console.log(`\ Scholar service avviato sulla porta ${PORT}`);
});

// To test the route http://localhost:8002/parse?ateneo=Catania&name=Giovanni&surname=Russo

// TEST GIT