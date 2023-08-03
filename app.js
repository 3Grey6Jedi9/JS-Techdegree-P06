
/* This code is setting up a basic Express.js server to handle different routes and render Pug templates based on
those routes. */




const express = require('express'); // Importing the Express.js library
const data = require('./data.json'); // Importing the JSON data. This data will be used to populate the Pug templates with dynamic content.
const path = require('path'); // Importing the 'path' module to handle file paths

const app = express(); // Creating an instance of the Express.js application

app.set('view engine', 'pug'); // Setting the view engine to Pug. This allows Express to use Pug templates for rendering.

app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory.


// Serve static files from the 'Images' directory
app.use('/Images', express.static(path.join(__dirname, 'Images')));

// Route for the home page. We will render the index.pug template and pass the data from the 'data.json' to the template
app.get('/', (req, res) => {
  res.render('index', { data });
});



// Route for the 'about' page
app.get('/about', (req, res) => {
  res.render('about');
});


/* Dynamic route for the projects. When the user visits a URL, the server will extract the project ID from the URL and
will find the corresponding data from the data.json */
app.get('/project/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = data.projects.find((proj) => proj.id === projectId);
  if (!project) {
    res.render('404');
  } else {
    res.render('project', { project });
  }
});



// Middleware that catches all unmatched routes
app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  console.log(`Error: ${error.message} - Status: ${error.status}`);
  res.status(404); // Setting the status code to 404 for page not found errors
  res.render('page-not-found', { error }); // Rendering page-not-found.pug
});




// Middleware that catches any error that might occur during the request/response cycle.
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.log(`Error: ${err.message} - Status: ${err.status}`);
  res.status(err.status);
  res.render('error', { error: err }); // Rendering error.pug for other errors
});





// Defining the port number on which the server will listen for incoming requests.
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});









