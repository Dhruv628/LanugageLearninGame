const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the beginning and end
  },
  options: [
    {
      type: String,
      required: true,
      trim: true, // Trim whitespace from the beginning and end for each option
    },
  ],
  answer: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the beginning and end
  },
  difficulty: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the beginning and end
  },
  language: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the beginning and end
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
