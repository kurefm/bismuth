const { scheduleJob } = require('./job-scheduler');
const { ifNotExistsThenCreateDoc, client } = require('./es');
const {
  bismuth: { info: { index, type, cron } }
} = require('config');
const logger = require('../logger').base;
const { getId } = require('../utils');
const os = require('os');
const { getMode } = require('../loader');
const { omit } = require('lodash');

const id = getId();

function init() {
  return ifNotExistsThenCreateDoc(index, type, id, getInfo()).then(updateInfo);
}

function updateInfo() {
  scheduleJob('info:update', cron, () => {
    client.update({
      index,
      type,
      id,
      body: {
        doc: getInfo()
      }
    }).then(() => logger.debug('Update info')).catch(logger.error);
  });
}

function getInfo() {
  return {
    arch: os.arch(),
    platform: os.platform(),
    release: os.release(),
    hostname: os.hostname(),
    cpus: os.cpus(),
    freemem: os.freemem(),
    totalmem: os.totalmem(),
    uptime: os.uptime(),
    netifs: omit(os.networkInterfaces(), ['lo']),
    mode: getMode(),
  };
}

module.exports = {
  init
};
