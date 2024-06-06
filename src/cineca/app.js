const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const cinecaRoute = require('./cinecaRoute.js');

const app = express();
const PORT = process.env.CINECA_PORT || 8001;

app.use('/', cinecaRoute);

// Start server
app.listen(PORT, () => {
  console.log(`\nCineca service avviato sulla porta ${PORT}`);
});

// Link: http://localhost:8001/search?researcherName=Francesco_Moscato

// TEST GIT