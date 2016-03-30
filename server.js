'use strict';
// Babel setup
process.env.BABEL_DISABLE_CACHE = 1; // Required for open shift
require('babel-register'); // Transpiles the code using babel.
require('babel-polyfill'); // Polyfill for newer features like async/await.

// Prevent promises from swallowing errors.
process.on('unhandledRejection', function(error, promise) {
  console.error(error.toString());
  throw (error);
});

// Include tha actual sails app.
require('./app.js');
