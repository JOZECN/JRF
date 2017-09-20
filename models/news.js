var mongoose = require('mongoose');
var newsSchema = require('../schemas/news');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('News',newsSchema);