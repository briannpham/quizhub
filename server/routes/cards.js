const express = require('express');

const cardsController = require('../controllers/cardsController.js');
const router = express.Router();


router.get('/', cardsController.loadCards, (req, res) => {
  // res.status(200).send('Loading Cards');
  console.log('Loading cards in Router');
  res.status(200).json(res.locals.cards);
});

router.post('/', cardsController.createCard, (req, res) => {
  // res.status(200).send('Creating Cards');
  console.log('Creating card in Router');
  res.status(200).json(res.locals.newCard);
});

router.patch('/:id', cardsController.updateCard, (req, res) => {
  // res.status(200).send(`Updating Card ${req.params.id}`);
  console.log('Updating card in Router');
  res.status(200).json(res.locals.updatedCard);
});

router.delete('/:id', cardsController.deleteCard, (req, res) => {
  // res.status(200).send(`Deleting Card ${req.params.id}`);
  console.log('Deleting card in Router');
  res.status(200).json(res.locals.deletedCard);
});


module.exports = router;