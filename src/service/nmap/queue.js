const { queue } = require('async');
const { remove, isEmpty } = require('lodash');
const { exec, xml2js } = require('../../utils');
const logger = require('../../logger').nmap;
const config = require('config');
const { setTimeout } = require('timers');
const { parse } = require('./parser');
const { client } = require('../es');

function makeCache(host, ttl) {
  this.push(host);
  setTimeout(() => {
    remove(this, item => item === host);
  }, ttl * 1000);
}

const osCache = [];
const versionCache = [];
osCache.makeCache = makeCache.bind(osCache);
versionCache.makeCache = makeCache.bind(versionCache);

const osDetectoin = queue((host, callback) => {
  logger.debug(`OS detection run on host: ${host}`);
  if (osCache.includes(host)) {
    logger.debug(`Host ${host} in cache`);
    callback();
    return;
  }
  osCache.makeCache(host, 300);
  exec([config.nmap.bin, '-oX', '-', '-O', host])
    .then(resultProcess.push)
    .catch(logger.error)
    .then(() => callback());
});

const versionDetectoin = queue((host, callback) => {
  logger.debug(`Version detection run on host: ${host}`);
  if (versionCache.includes(host)) {
    logger.debug(`Host ${host} in cache`);
    callback();
    return;
  }
  versionCache.makeCache(host, 300);
  exec([config.nmap.bin, '-oX', '-', '-sV', host])
    .then(resultProcess.push)
    .catch(logger.error)
    .then(() => callback());
});

const resultProcess = queue((result, callback) => {
  xml2js(result).then(parse).then(parsed => {
    logger.debug(`Process result: \n${JSON.stringify(parsed, null, 2)}`);
    parsed.hosts.forEach(host => {
      osDetectoin.push(host.ipv4);
      versionDetectoin.push(host.ipv4);
    });
    return parsed;
  }).then(bulkStore).catch(logger.error)
    .then(() => callback());
});

function bulkStore(parsed) {
  if (isEmpty(parsed.hosts) && isEmpty(parsed.ports) && isEmpty(parsed.os)) {
    return;
  }
  let body = [];
  parsed.hosts.forEach(host => {
    body.push({ index: { _index: 'nmap', _type: 'host' } });
    body.push(host);
  });
  parsed.ports.forEach(host => {
    body.push({ index: { _index: 'nmap', _type: 'port' } });
    body.push(host);
  });
  parsed.os.forEach(host => {
    body.push({ index: { _index: 'nmap', _type: 'os' } });
    body.push(host);
  });
  return new Promise((resolve, reject) => {
    client.bulk({ body }).then(resolve, reject);
  });
}

module.exports = {
  osDetectoin,
  versionDetectoin,
  resultProcess
};
