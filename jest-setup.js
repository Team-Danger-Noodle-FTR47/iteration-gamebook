const regeneratorRuntime = require('regenerator-runtime');

module.exports = async () => {
  global.testServer = require('./server/server.js');
};