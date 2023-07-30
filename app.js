
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


// Index route to render the "Home" page with the locals set to data.projects
app.get('/', (req, res) => {


    res.render('index', {projects: data.projects})

});


// About route to render the "About" page

app.get('/about', (req, res) => {

    res.render('about');


});


// Dynamic "project" route based on the id of the project

app.get('/project/:id', (req, res)=>{

    const projectId = parseInt(req.params.id); // Getting the project ID from the URL
    const project = data.projects.find((proj) => proj.id === projectId); // Finding the project with the matching ID
    if (!project) {

    // If project not found, render a 404 page or handle the error as you prefer

        res.render('404');

    } else {

        // Render the customized version of the Pug project template with data specific to the project

        res.render('project', {project});

    }

});




// 404 handler for undefined routes

app.use((req, res, next) =>{

    const error = new Error('Page not found'); // A new Error object with the error message
    error.status = 404; // Set the status code for the error (404 for "Not Found")
    console.log(`Error: ${error.message} - Status: ${error.status}`); // logging the error message and status
    next(error); // Passing the error to the next error-handling middleware

});


// Global error handler for server errors

app.use((err, req, res, next) => {

    err.status = err.status || 500; // Setting the status code to 500 (Internal Server Error) if not already set
    err.message = err.message || 'Internal Server Error'; // Setting a default error message if not already set
    console.log(`Error: ${err.message} - Status: ${err.status}`)

    // Rendering the error page with the error message and status
    res.status(err.status);
    res.render('error', {error: err.message});

});


// Starting the server


const port = 3000;

app.listen(port, () => {

    console.log(`Server started on port ${port}`);

});








