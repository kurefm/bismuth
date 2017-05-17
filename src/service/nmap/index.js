const localConfig = require('../../config');
const remoteConfig = require('../config');
const { scheduleJob } = require('../job-scheduler.js');
const logger = require('../../logger').nmap;
const { exec, xml2js } = require('../../utils');
const { client } = require('../es');
const { setTimeout } = require('timers');
const { parseHost } = require('./parser');
const { each } = require('async');
const { resultProcess } = require('./queue');

function scan() {
  let cmd = [localConfig.nmap.bin, '-oX', '-', '192.168.8.1/24', '-sP'];
  logger.info(`Scan host with cmd: ${cmd.join(' ')}`);
  return exec(cmd);
}

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 10000);
  });
}

function doScan() {
  scan().then(xml2js)
    .then(parseHost)
    .then(storeResult)
    .catch(logger.error)
    .then(delay)
    .then(doScan);
}

function storeResult(result) {
  return new Promise((resolve, reject) => {
    each(result, (item, callback) => {
      client.index({
        index: 'nmap',
        type: 'host',
        opType: 'index',
        body: item
      }).then(() => callback(), reject);
    }, error => {
      if (error) reject(error);
      resolve();
    });
  });
}

function init() {
  scheduleJob('nmap:hostDetection', remoteConfig.config()['hs:hostDetection:cron'], () => {
    let config = remoteConfig.config();
    logger.debug(`Host detection run on network: ${config['hs:network']}`);
    exec([localConfig.nmap.bin, '-oX', '-', config['hs:network'], '-sP']).then(resultProcess.push, logger.error);
  });
}

module.exports = {
  init
};
