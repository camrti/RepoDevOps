require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const searchRoute = require('./searchRoute.js');

const app = express();
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

// Use the search module
app.use('/', searchRoute);

// Avvia il server
app.listen(PORT, () => {
    console.log(`\nSearch service avviato sulla porta ${PORT}`);
  });