// Having routes in different files is known as modular routing
// Modular routing is for neat practice

// This file is responsible for all the main routes

const express = require('express');

// express has a Router which has all the routing functionality
const router = express.Router();

// below is also a middleware
router.get('/', (req, res) => {
  const name = req.cookies.name
  if (name) {
    return res.redirect('/card');
  }
  else {
    return res.redirect('/hello');
  }
});

router.post('/', (req, res) => {
  res.clearCookie('name');
  return res.redirect('/hello');
});


router.get('/hello', (req, res) => {
  const name = req.cookies.name
  if (name) {
    return res.redirect('/');
  }
  else {
    return res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  // save the name in the cookie
  res.cookie('name', req.body.username);

  // redirect to home page
  return res.redirect('/');
});

module.exports = router;
