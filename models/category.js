const mongoose = require('mongoose');
const categoriesSchema = require('../schemas/categories');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Category',categoriesSchema);