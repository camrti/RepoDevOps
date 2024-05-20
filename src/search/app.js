require('dotenv').config();
const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.SEARCH_PORT || 8000;

// Set the views directory
app.set('views', path.join(__dirname, '..', 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static file of the public directory
app.use(express.static('public'));

// Middleware for parsing the request body
app.use(bodyParser.json());

// Use the search module
app.use('/', searchRoute);