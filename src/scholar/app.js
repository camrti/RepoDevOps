// Scholar Service

const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const scholarRoute = require('./scholarRoute.js');

// Create the Express application
const app = express();

// Set the port number
const PORT = process.env.SCHOLAR_PORT || 8002;

// Use the Scholar route
app.use('/', scholarRoute);

// Start Scholar Service
app.listen(PORT, () => {
  console.log(`\nScholar service started on port ${PORT}`);
});
