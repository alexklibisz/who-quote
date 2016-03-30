'use strict';
// Babel setup
process.env.BABEL_DISABLE_CACHE = 1;
require('babel-register');
require('babel-polyfill');

// Prevent promises from swallowing errors.
process.on('unhandledRejection', function(error, promise) {
  console.error(error.toString());
  throw (error);
});

require('./app.js');
