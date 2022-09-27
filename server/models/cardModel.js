const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;