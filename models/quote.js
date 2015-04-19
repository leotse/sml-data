/////////////////////
// models/quote.js //
/////////////////////

// libs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// schema
var schema = new Schema({

  // ticker
  ticker: { type: String, required: true },

  // date - date of this data became avaiable
  date: { type: Date, required: true },

  // open, close, high, low, volume
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number, required: true }

}, { strict: true });

// indexes
schema.index({ ticker: 1, date: -1 });
schema.index({ date: -1 });

// export
module.exports = schema;