const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  // Check if it's working hours (Monday to Friday, 9 AM to 5 PM)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware/route handler
  } else {
    res.send('<h1>The web application is currently closed.</h1>');
  }
};

// Set up body parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static('public'));

// Home page route
app.get('/', workingHoursMiddleware, (req, res) => {
  res.render('home');
});

// Our Services page route
app.get('/services', workingHoursMiddleware, (req, res) => {
  res.render('services');
});

// Contact Us page route
app.get('/contact', workingHoursMiddleware, (req, res) => {
  res.render('contact');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
