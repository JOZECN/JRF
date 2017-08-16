const mongoose = require('mongoose');
const newsSchema = require('../schemas/news');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('News',newsSchema);