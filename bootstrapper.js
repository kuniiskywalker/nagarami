// install babel hooks in the main process
require('babel-register')({
  extensions: [".es6", ".es", ".jsx", ".js"]
});
require("babel-polyfill");

require('./index.js');
