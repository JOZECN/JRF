var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

mongoose.Promise = global.Promise;
module.exports = mongoose.model('User',usersSchema);