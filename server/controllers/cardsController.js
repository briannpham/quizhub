const mongoose = require('mongoose');

// model

const cardsController = {};

// @desc     Load cards when user signs in
// @route:   GET /api/cards
cardsController.loadCards = (req, res, next) => {
  console.log('Loading cards in cardsController.loadCards');
  next();
};


// @desc     Create new card
// @route:   POST /api/cards
cardsController.createCard = (req, res, next) => {
  console.log('Creating cards in cardsController.loadCards');
  // console.log(req.body);
  res.locals.data = req.body;
  console.log('in controller')
  console.log(res.locals.data);
  next();
};

// @desc     Update card
// @route:   PUT /api/cards/:id
cardsController.updateCard = (req, res, next) => {
  next();
};


// @desc     Delete card
// @route:   DELETE /api/cards/:id
cardsController.deleteCard = (req, res, next) => {
  next();
};

module.exports = cardsController;