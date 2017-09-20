var mongoose = require('mongoose');
var answersSchema = require('../schemas/answers');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Answer',answersSchema);