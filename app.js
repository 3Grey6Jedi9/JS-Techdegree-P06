const express = require('express');
const data = require('./data.json');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { data });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = data.projects.find((proj) => proj.id === projectId);
  if (!project) {
    res.render('404');
  } else {
    res.render('project', { project });
  }
});

app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  console.log(`Error: ${error.message} - Status: ${error.status}`);
  next(error);
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.log(`Error: ${err.message} - Status: ${err.status}`);
  res.status(err.status);
  res.render('error', { error: err });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});









