const mongoose = require('mongoose');
const Card = require('../models/cardModel');

const cardsController = {};

// @desc     Load cards when user signs in
// @route:   GET /api/cards
cardsController.loadCards = async (req, res, next) => {
  try {
    console.log('Loading cards in cardsController.loadCards'.green);
    console.log(req.user);
    const cards = await Card.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.locals.cards = cards;
    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Create new card
// @route:   POST /api/cards
cardsController.createCard = async (req, res, next) => {
  try {
    console.log('Creating card in cardsController.loadCards'.green);
    const { question, answer } = req.body;

    if (!question || !answer) {
      return next({
        message: { err: 'Missing required input fields. ERROR in cardsController.createCard' }
      });
    }

    const newCard = await Card.create({ question, answer });
    res.locals.newCard = newCard;
    console.log(res.locals.newCard);
    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Update card
// @route:   PATCH /api/cards/:id
cardsController.updateCard = async (req, res, next) => {
  try {
    console.log('Updating card in cardsController.updateCard'.green);
    const id = req.params.id;

    // check if /:id is a valid ObjectId in database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        message: { err: 'Invalid ID. No such card exists. ERROR in cardsController.updateCard' }
      });
    }

    if (!req.body.question || !req.body.answer) {
      return next({
        message: { err: 'Missing required input field. ERROR in cardsController.updateCard' }
      });
    }

    const update = {
      question: req.body.question,
      answer: req.body.answer,
      status: req.body.status,
      favorite: req.body.favorite
    };
    const updatedCard = await Card.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!updatedCard) {
      return next({
        message: { err: 'No such card exists. ERROR in cardsController.updateCard' }
      });
    }

    res.locals.updatedCard = updatedCard;
    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Delete card
// @route:   DELETE /api/cards/:id
cardsController.deleteCard = async (req, res, next) => {
  try {
    console.log('Deleting card in cardsController.deleteCard'.green);
    const id = req.params.id;

    // check if /:id is a valid ObjectId in database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        message: { err: 'Invalid ID. No such card exists. ERROR in cardsController.deleteCard' }
      });
    }

    const deletedCard = await Card.findOneAndDelete({ _id: id });

    if (!deletedCard) {
      return next({
        message: { err: 'No such card exists. ERROR in cardsController.updateCard' }
      });
    }

    res.locals.deletedCard = deletedCard;
    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};

module.exports = cardsController;