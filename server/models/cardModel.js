const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Reviewed", "Not Reviewed"],
    default: "Not Reviewed"
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

const Card = mongoose.model('card', cardSchema);

module.exports = Card;