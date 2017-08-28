const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  image: {
    type: String,
    default: '../../public/img/slide_default.jpg'
  },
  bTitle: String,
  sTitle: String,
  product: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }
});