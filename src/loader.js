const {
  bismuth: { mode, api: { prefix } }
} = require('config');
const { readdir } = require('fs');
const { join, basename } = require('path');
const { includes } = require('lodash');
const { waterfall } = require('async');
const logger = require('./logger').base;
const { underscored } = require('./utils');

function getMode() {
  switch (mode) {
  case 'all':
    return ['hs', 'ids', 'node'];
  case 'agent':
    return ['hs', 'ids'];
  default:
    return mode.split(',');
  }
}

function initBaseService() {
  logger.info('Load base Services');
  return Promise.all([
    require('./service/config').init(),
    require('./service/alive').init(),
    require('./service/info').init(),
  ]);
}

function initHsService() {
  logger.info('Load host scan services');
  return require('./service/nmap').init();
}

function initIDSService() {
  logger.info('Load IDS services');
  return require('./service/suricata').init();
}

function initNodeService(express) {
  logger.info('Load node services');
  express.use(require('express').static('pubilc'));
  // load routes
  let routeDir = join(__dirname, 'routes');
  return new Promise((resolve, reject) => {
    readdir(routeDir, (err, dirs) => {
      if (err) reject(err);
      dirs.forEach(filename => {
        if (!filename.endsWith('.js')) return;
        let route = require(join(routeDir, filename));
        let routeName = basename(filename, '.js');
        express.use(routeName === 'index' ? prefix : prefix + underscored(routeName), route);
      });
      resolve();
    });
  });
}

function init(express) {
  let mode = getMode();
  logger.info(`Bismuth run on ${mode.join(',')} mode`);
  return new Promise((resolve, reject) => {
    waterfall([
      callback => initBaseService().then(() => callback(null), callback),
      callback => {
        let loaderArray = [];
        if (includes(mode, 'hs')) loaderArray.push(initHsService());
        if (includes(mode, 'ids')) loaderArray.push(initIDSService());
        if (includes(mode, 'node')) loaderArray.push(initNodeService(express));

        Promise.all(loaderArray).then(() => {
          callback(null);
        }, callback);
      }
    ], error => {
      if (error) reject(error);
      logger.info('All services load finish');
      resolve();
    });
  });
}

module.exports = {
  init,
  getMode
};
