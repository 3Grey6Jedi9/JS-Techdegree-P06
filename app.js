
// Requiring dependencies

const express = require('express');
const data = require('./data.json');
const path = require('path');


// Create Express App

const app = express();

// Setting up mine middleware

app.set('view engine', 'pug'); // Setting the view engine to pug

// Using a static route to serve the static files from the public folder

app.use(express.static(path.join(__dirname, 'public')));

// Setting up my routes









