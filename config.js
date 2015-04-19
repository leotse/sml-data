///////////////
// config.js //
///////////////

// app configuration
var config = {

  // db connection
  db: {
    uri: 'localhost:27017/stocks',
    options: {}
  },

  // quandl api key
  quandl: { 
    key: 'pAN7iz9_Uz8cnyJyEPAe' 
  },

  // edgar api key
  edgar: {
    key: 'pgn43edarv9tskyvn7ckvgxb',
    secret: 'rFDCpFBUMt'
  }
};

module.exports = config;