const express = require('express');

const cardsController = require('../controllers/cardsController.js');
const router = express.Router();


router.get('/', cardsController.loadCards, (req, res) => {
  res.status(200).send('Loading Cards');
});

router.post('/', cardsController.createCard, (req, res) => {
  // res.status(200).send('Creating Cards');
  res.status(200).json(res.locals.data);
});

router.put('/:id', cardsController.updateCard, (req, res) => {
  res.status(200).send(`Updating Card ${req.params.id}`);
});

router.delete('/:id', cardsController.deleteCard, (req, res) => {
  res.status(200).send(`Deleting Card ${req.params.id}`);
});


module.exports = router;