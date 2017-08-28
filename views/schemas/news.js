const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title: String,
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  content: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  date: String,
  view: Number
});