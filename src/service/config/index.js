const { ensureExists, client } = require('../es');
const {
  bismuth: { id, config: { index, type } }
} = require('../../config');
const { scheduleJob } = require('../job-scheduler');
const logger = require('../../logger').http;

let config = {};

function init() {
  return ensureExists(index, type, id, require('./default')).then(load).then(autoRefresh);
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
  scheduleJob('config:refresh', '*/10 * * * * *', () => {
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



