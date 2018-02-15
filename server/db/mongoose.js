const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://todouser:RSMUSA#123@ds147902.mlab.com:47902/todoapp');

module.exports = {mongoose};