const express = require('express');

const cardsController = require('../controllers/cardsController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', authMiddleware.protect, cardsController.loadCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
});

router.post('/', authMiddleware.protect, cardsController.createCard, (req, res) => {
  return res.status(200).json(res.locals.newCard);
});

router.patch('/:id', authMiddleware.protect, cardsController.updateCard, (req, res) => {
  return res.status(200).json(res.locals.updatedCard);
});

router.delete('/:id', authMiddleware.protect, cardsController.deleteCard, (req, res) => {
  return res.status(200).json(res.locals.deletedCard);
});


module.exports = router;