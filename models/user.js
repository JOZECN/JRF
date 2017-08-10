const mongoose = require('mongoose');
const categoriesSchema = require('../schemas/users');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('User',categoriesSchema);