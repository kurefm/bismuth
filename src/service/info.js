const { scheduleJob } = require('./job-scheduler');
const { ifNotExistsThenCreateDoc, client } = require('./es');
const {
  bismuth: { info: { index, type, cron } }
} = require('config');
const logger = require('../logger').base;
const { getId } = require('../utils');
const os = require('os');
const { getMode } = require('../loader');

let id = getId();

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
      }}).catch(logger.error);
  });
}

function getInfo() {
  return {
    arch: os.arch(),
    cpus: os.cpus(),
    freemem: os.freemem(),
    totalmem: os.totalmem(),
    uptime: os.uptime(),
    netif: os.networkInterfaces(),
    mode: getMode()
  };
}

module.exports = {
  init
};
