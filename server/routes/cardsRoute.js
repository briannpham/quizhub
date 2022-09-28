const express = require('express');

const cardsController = require('../controllers/cardsController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', authMiddleware.protect, cardsController.loadCards, (req, res) => {
  console.log('Loading cards in Router'.green);
  res.status(200).json(res.locals.cards);
});

router.post('/', authMiddleware.protect, cardsController.createCard, (req, res) => {
  console.log('Creating card in Router'.green);
  res.status(200).json(res.locals.newCard);
});

router.patch('/:id', authMiddleware.protect, cardsController.updateCard, (req, res) => {
  console.log('Updating card in Router'.green);
  res.status(200).json(res.locals.updatedCard);
});

router.delete('/:id', authMiddleware.protect, cardsController.deleteCard, (req, res) => {
  console.log('Deleting card in Router'.green);
  res.status(200).json(res.locals.deletedCard);
});


module.exports = router;