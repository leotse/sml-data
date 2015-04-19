/////////////////
// download.js //
/////////////////

// downloads stocks fundamental data from quandl

// libs
var _ = require('lodash');
var async = require('async');
var request = require('request');

var config = require('./config');
var models = require('./models');
var quandl = require('./utils/quandl');
var fundamentals = quandl.fundamentals;
var quotes = quandl.quotes;

// start - connect to db -> read tickers -> download and save fundamentals
async.waterfall([ connect, tickers, download ], onComplete);

// step 1 - connect to db
function connect(done) { models.connect(config.db, done); }

// step 2 - get tickers
function tickers(conn, done) {
  setImmediate(function() {
    done(null, [ 'aapl', 'msft', 'ddd' ]);
  });
}

// step 2 - download fundamentals from quandl
function download(tickers, done) {
  async.map(tickers, fundamentals.get, done);
}

function onComplete(err, results) {
  if(err) { throw err; }
  _.each(results, function(fundamentals) {
    _.each(fundamentals, function(item) {
      var ticker = item.ticker;
      var date = item.date.format('YYYY-MM-DD');
      var revenue = item.revenue;
      var net_income = item.net_income;
      if(revenue && net_income) {
        console.log('%s %s %s %s %s%', ticker, date, revenue, net_income, (net_income/revenue*100).toFixed(2));
      }
    });
  });
  process.exit();
}