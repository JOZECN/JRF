const mongoose = require('mongoose');
const questionsSchema = require('../schemas/questions');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Question',questionsSchema);