let { queue } = require('async');
let { exec } = require('../../utils');
let logger = require('../../logger').nmap;
const config = require('../../config');

osCache = []
versionCache = []

const osDetectoin = queue((host, callback) => {
  logger.debug(`OS detection run on host: ${host}`);
  exec([config.nmap.bin, '-oX', '-', '-O', host]).then(result => {
    resultProcess.push(result);
    callback();
  }, error => {
    logger.error(error);
    callback(error);
  });
});

const versionDetectoin = queue((host, callback) => {
  logger.debug(`Version detection run on host: ${host}`);
  exec([config.nmap.bin, '-oX', '-', '-sV', host]).then(result => {
    resultProcess.push(result);
    callback();
  }, error => {
    logger.error(error);
    callback(error);
  });
});
const resultProcess = queue((result, callback) => {
  logger.debug(`Process result: ${result}`);
  callback();
});

module.exports = {
  osDetectoin,
  versionDetectoin,
  resultProcess
};
