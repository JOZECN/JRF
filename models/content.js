var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Content',contentsSchema);