const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  description: String,
  content: String,
  image: String
});