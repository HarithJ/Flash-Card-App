// This file is responsible for all the routes that have to deal with cards

const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcards.json');
const { cards } = data; // same as cards = data.cards

router.get('/', (req, res) => {
  const numOfCards = cards.length;
  const flashCardId = Math.floor(Math.random() * numOfCards);

  res.redirect(`card/${flashCardId}`);
})

// : turns the parameter into variable id is the name of the variable
router.get('/:id', (req, res) => {
  // const { side } = req.query; // query string eg ?side=question

  const card = cards[req.params.id];

  templateData = card;
  console.log(templateData);
  res.render('card', templateData);
});

module.exports = router;
