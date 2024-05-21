require('dotenv').config();
const express = require('express');
const researcherRoute = require('./researcherRoute.js');

const app = express();
const PORT = process.env.RESEARCHER_PORT || 8001;

app.use('/', researcherRoute);

// Start server
app.listen(PORT, () => {
  console.log(`\nResearcher service avviato sulla porta ${PORT}`);
});

// Link: http://localhost:8001/search?researcherName=Francesco_Moscato

// TEST GIT