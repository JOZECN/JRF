const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String
});