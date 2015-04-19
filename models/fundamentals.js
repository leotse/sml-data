////////////////////////////
// models/fundamentals.js //
////////////////////////////

// libs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// contants
var types = [ 'annual', 'quarterly' ];

// schema
var schema = new Schema({

  // ticker
  ticker: { type: String, required: true },

  // type - annual or quarterly
  type: { type: String, required: true, enum: types },

  // date - date of this data became avaiable
  date: { type: Date, required: true },

  // fundamentals (income statement) - fundamentals found in income statments
  total_revenue: { type: Number, required: true },
  total_operating_expenses: { type: Number, required: true },
  research_development: { type: Number, required: true },
  net_income: { type: Number, required: true },
  // and more...

  // fundamentals (balance sheet) - fundamentals found in balance sheets 
  total_assets: { type: Number, required: true },
  total_debt: { type: Number, required: true },
  total_equity: { type: Number, required: true },
  total_common_shares_outstanding: { type: Number, required: true },
  // and more...

  // fundamentals (cash flow) - fundamentals found in cash flow statements
  cash_from_operating_activities: { type: Number, required: true },
  cash_from_investing_activities: { type: Number, required: true },
  cash_from_financing_activities: { type: Number, required: true },
  net_change_in_cash: { type: Number, required: true }
  // and more...

}, { strict: true });

// indexes
schema.index({ ticker: 1, type: 1 });

// export
module.exports = schema;