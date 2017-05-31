const { checkWorkDir, start } = require('./lancher');
const { loadOrigin, generateConfigFile, autoPushAvailableRules } = require('./config');
const { merge } = require('lodash');

function init() {
  return Promise.all([checkWorkDir(), loadOrigin()])
    .then(generateConfigFile)
    .then(start)
    .then(autoPushAvailableRules);
}

module.exports = merge({
  init
}, require('./searcher'));
