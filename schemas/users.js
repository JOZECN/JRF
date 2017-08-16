const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  name: String,
  phoneNum: String,
  eMail: String,
  date: String,
  view: {
    type: Number,
    default: 0
  },
  userImg: {
    type: String,
    default: '../public/img/avatar.jpg'
  }
});