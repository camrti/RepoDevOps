// Cineca Service

const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const cinecaRoute = require('./cinecaRoute.js');

// Create the Express application
const app = express();

// Set the port number
const PORT = process.env.CINECA_PORT || 8001;

// Use the Cineca route
app.use('/', cinecaRoute);

// Start Cineca Service
app.listen(PORT, () => {
  console.log(`\nCineca service started on port ${PORT}`);
});