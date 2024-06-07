// Scopus Service

const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const route = require('./scopusRoute.js');

// Create the Express application
const app = express();

// Set the port number
const PORT = process.env.SCOPUS_PORT || 8003;

// Use the Scopus route
app.use('/', route);

// Start Scopus Service
app.listen(PORT, () => {
  console.log(`\nScopus service started on port ${PORT}`);
});
