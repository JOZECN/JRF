const mongoose = require('mongoose');
const answersSchema = require('../schemas/answers');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Answer',answersSchema);