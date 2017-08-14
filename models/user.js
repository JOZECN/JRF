const mongoose = require('mongoose');
const usersSchema = require('../schemas/users');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('User',usersSchema);