const { checkWorkDir } = require('./lancher');
const { loadOrigin, generateConfigFile } = require('./config');

function init() {
  return Promise.all([checkWorkDir(), loadOrigin()]).then(generateConfigFile);
}

module.exports = {
  init
};
