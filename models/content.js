const mongoose = require('mongoose');
const contentsSchema = require('../schemas/contents');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Content',contentsSchema);