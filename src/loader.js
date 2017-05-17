const { bismuth } = require('./config');

function initBaseService() {
  return Promise.all([
    require('./service/config').init(),
    require('./service/alive').init(),
  ]);
}

function initHsService() {
  require('./service/nmap').init();
}

function init() {
  return initBaseService().then(initHsService);
}

module.exports = {
  init
};
