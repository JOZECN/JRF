var mongoose = require('mongoose');
var questionsSchema = require('../schemas/questions');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Question',questionsSchema);