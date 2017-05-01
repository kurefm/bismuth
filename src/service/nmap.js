const config = require('../config');
const logger = require('../logger')['hs-agent'];
const { exec, xml2js } = require('../utils');
const es = require('./es');
const { setTimeout } = require('timers');

function scan() {
  let options = [];
  if (config.hs.detectService) options.push('-sV');
  if (config.hs.detectOS) options.push('-O');
  if (options.length === 0) options.push('-sP');

  let cmd = [config.nmap.bin, '-oX', '-', config.hs.network, ...options];
  logger.info(`Scan host with cmd: ${cmd.join(' ')}`);
  return exec(cmd);
}

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, config.hs.interval * 1000);
  });
}

function doScan() {
  scan().then(xml2js)
    .then(storeResult)
    .catch(logger.error)
    .then(delay)
    .then(doScan);
}

function storeResult(result) {
  // store to elasticsearch
  logger.info(JSON.stringify(result));
}

doScan();


