var mongoose = require('mongoose');
var slidesSchema = require('../schemas/slides');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Slide',slidesSchema);