const express = require('express');

const cardsController = require('../controllers/cardsController.js');
const router = express.Router();


router.get('/', cardsController.loadCards, (req, res) => {
  console.log('Loading cards in Router'.green);
  res.status(200).json(res.locals.cards);
});

router.post('/', cardsController.createCard, (req, res) => {
  console.log('Creating card in Router'.green);
  res.status(200).json(res.locals.newCard);
});

router.patch('/:id', cardsController.updateCard, (req, res) => {
  console.log('Updating card in Router'.green);
  res.status(200).json(res.locals.updatedCard);
});

router.delete('/:id', cardsController.deleteCard, (req, res) => {
  console.log('Deleting card in Router'.green);
  res.status(200).json(res.locals.deletedCard);
});


module.exports = router;