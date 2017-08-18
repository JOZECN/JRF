const mongoose = require('mongoose');
const slidesSchema = require('../schemas/slides');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Slide',slidesSchema);