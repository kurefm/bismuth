const { ifNotExistsThenCreateDoc, client } = require('../es');
const {
  bismuth: { config: { index, type, cron } }
} = require('config');
const { scheduleJob } = require('../job-scheduler');
const logger = require('../../logger').base;
const { getId } = require('../../utils');

let config = {};

let id = getId();

function init() {
  return ifNotExistsThenCreateDoc(index, type, id, require('./default')).then(load).then(autoRefresh);
}

function load() {
  return new Promise((resolve, reject) => {
    client.get({
      index,
      type,
      id
    }, (error, resp) => {
      if (error) reject(error);
      if (resp) {
        config = resp._source;
        resolve(resp._source);
      }
      reject(resp);
    });
  });
}

function autoRefresh() {
  scheduleJob('config:refresh', cron, () => {
    load().then(() => logger.debug('Reload config')).catch(logger.error);
  });
}

function update(config) {
  return new Promise((resolve, reject) => client.update({
    index,
    type,
    id,
    body: { doc: config }
  }).then(resolve, reject));
}

module.exports = {
  init,
  load,
  update,
  config: () => config
};



