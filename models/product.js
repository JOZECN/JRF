var mongoose = require('mongoose');
var productsSchema = require('../schemas/products');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Product',productsSchema);