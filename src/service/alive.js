const { scheduleJob } = require('./job-scheduler');
const { ifNotExistsThenCreateDoc, client } = require('./es');
const {
  bismuth: { alive: { index, type, cron } }
} = require('config');
const logger = require('../logger').base;
const { getId } = require('../utils');

let id = getId();

function init() {
  return ifNotExistsThenCreateDoc(index, type, id, {
    lastOnline: new Date().getTime()
  }).then(keepAlive);
}

function keepAlive() {
  scheduleJob('alive:keepAlive', cron, () =>{
    client.update({
      index,
      type,
      id,
      body: { doc: {
        last_online: new Date().getTime()
      }}
    }).catch(logger.error);
  });
}

module.exports = {
  init
};
