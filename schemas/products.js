const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  description: String,
  feature: String,
  income: String,
  company: String,
  sort: String,
  time: String,
  pay: String,
  dealline: String,
  qualify: String,
  area: String,
  term: String,
  image: {
    type: String,
    default: '/../public/img/product_default.jpg'
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  date: String,
  view: Number
});