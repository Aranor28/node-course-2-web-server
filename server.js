const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; 
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to log file');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to the jungle!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
