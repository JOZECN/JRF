const mongoose = require('mongoose');
const productsSchema = require('../schemas/products');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Product',productsSchema);