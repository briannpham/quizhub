const mongoose = require('mongoose');
const Card = require('../models/cardModel');

const cardsController = {};

// @desc     Load cards when user signs in
// @route:   GET /api/cards
cardsController.loadCards = async (req, res, next) => {
  try {
    console.log('Loading cards in cardsController.loadCards'.green);
    const cards = await Card.find().sort({ createdAt: -1 });

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
      return res.status(404).json({ message: { err: 'Invalid ID. No such card exists' } });
    }

    const updatedQuestion = req.body.question;
    const updatedAnswer = req.body.answer;

    if (!updatedQuestion || !updatedAnswer) {
      return next({
        message: { err: 'Missing required input field. ERROR in cardsController.updateCard' }
      });
    }

    const update = { question: updatedQuestion, answer: updatedAnswer };
    const updatedCard = await Card.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: { err: 'No such card exists' } });
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
      return res.status(404).json({ message: { err: 'Invalid ID. No such card exists' } });
    }

    const deletedCard = await Card.findOneAndDelete({ _id: id });

    if (!deletedCard) {
      return res.status(404).json({ message: { err: 'No such card exists' } });
    }

    res.locals.deletedCard = deletedCard;
    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};

module.exports = cardsController;