// Search Service 

const path = require('path');
require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const bodyParser = require('body-parser');
const searchRoute = require('./searchRoute.js');

// Create the Express application
const app = express();

// Set the port number
const PORT = process.env.SEARCH_PORT || 8000;

// Set the views directory
app.set('views', path.join(__dirname, '..', 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static file of the public directory
app.use(express.static(path.join(__dirname, '..','..', 'public')));

// Middleware for parsing the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the search route
app.use('/', searchRoute);

// Start Search Service
app.listen(PORT, () => {
    console.log(`\nSearch service started on port ${PORT}`);
  });