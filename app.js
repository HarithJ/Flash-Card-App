const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// middleware to get exectued on /one route only
app.use('/one', (res, req, next) => {
  console.log('one');
  next(); // important step to end the middleware
});

// middleware to get exectued before every route
// Middlewares would ALWAYS execute in the order they are created
app.use((res, req, next) => {
  console.log('two');
  next();
});

app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/card.js');

app.use(mainRoutes);
app.use('/card', cardRoutes);

// if the route does not exists
// then throw a 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => console.log('Application is listening on port 3000'));
