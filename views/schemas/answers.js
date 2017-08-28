const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  answer: String,
  product: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  },
});