/////////////////////
// models/index.js //
/////////////////////

// handles db connection and models
var models = {}

// libs
var mongoose = require('mongoose');

// init - register models
mongoose.model('Fundamentals', require('./fundamentals'));
mongoose.model('Quote', require('./quote'));

// public - connect to db
module.exports.connect = function(config, callback) {
  mongoose.connect(config.uri, config.options, function(err) {
    callback(err, mongoose.connection);
  });
};

// public - get db model
module.exports.get = mongoose.model.bind(mongoose);