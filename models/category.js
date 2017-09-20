var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Category',categoriesSchema);