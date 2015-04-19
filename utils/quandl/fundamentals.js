//////////////////////////////////
// utils/quandl/fundamentals.js //
//////////////////////////////////

// simple wrapper for quandl stocks fundamentals api
var fundamentals = {};

// libs
var _ = require('lodash');
var util = require('util');
var async = require('async');
var moment = require('moment');
var config = require('../../config').quandl;

// constants
var INDICATORS = [ 'revenue', 'net_income' ];
var TABLE_FORMAT = '%s_%s_A';
var DATE_FORMAT = 'YYYY-MM-DD';

// init - quandl client
var Quandl = require('quandl');
var quandl = new Quandl({
  api_version: 1,
  auth_token: config.key
});

// public - get fundamentals for a given ticker
fundamentals.get = function(ticker, callback) {

  // sanity check
  if(!ticker) { return callback(new Error('ticker is required')); }

  // get indicators
  async.map(INDICATORS, getFundamentals, onDataReady);

  function getFundamentals(indicator, done) {
    var table = util.format(TABLE_FORMAT, ticker, indicator).toUpperCase();
    quandl.dataset({ source: 'RAYMOND', table: table }, done);
  }

  function onDataReady(err, results) {
    var datasets = _.map(results, function(result) {
      return JSON.parse(result).data;
    });

    // build fundamentals data structure
    var byDate = {};
    _.each(datasets, function(dataset, index) {
      var indicator = INDICATORS[index];
      _.each(dataset, function(datapoint) {
        var date = datapoint[0];
        var value = datapoint[1];
        if(!byDate[date]) {
          byDate[date] = {};
        }
        byDate[date][indicator] = value;
      });
    });

    // and transform to proper format
    var fundamentals = _.map(byDate, function(values, dateString) {
      var result = _.clone(values);
      result.date = moment(dateString, DATE_FORMAT);
      result.ticker = ticker;
      return result;
    });

    callback(null, fundamentals);
  }
};

module.exports = fundamentals;