const mongoose = require('mongoose');
const categoriesSchema = require('../schemas/products');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Product',categoriesSchema);