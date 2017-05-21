const { scheduleJob } = require('./job-scheduler');
const { ensureExists, client } = require('./es');
const {
  bismuth: { id, alive: { index, type } }
} = require('config');
const logger = require('../logger').core;

function init() {
  return ensureExists(index, type, id, {
    lastOnline: new Date().getTime()
  }).then(keepAlive);
}

function keepAlive() {
  scheduleJob('alive:keepAlive', '*/10 * * * * *', () =>{
    client.update({
      index,
      type,
      id,
      body: { doc: {
        lastOnline: new Date().getTime()
      }}
    }).catch(logger.error);
  });
}

module.exports = {
  init
};
