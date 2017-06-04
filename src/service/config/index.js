const { ifNotExistsThenCreateDoc, client } = require('../es');
const {
  bismuth: { config: { index, type, cron } }
} = require('config');
const { scheduleJob } = require('../job-scheduler');
const logger = require('../../logger').base;
const { getId } = require('../../utils');
const { waterfall } = require('async');
const { has, isEqual, isEmpty } = require('lodash');
const { EventEmitter } = require('events');

let config = {};
let configChangeEmitter = new EventEmitter();

const id = getId();

function checkTemplate() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.indices.getTemplate((error, response) => {
          if (error) callback(error);
          else {
            callback(null, has(response, 'bismuth'));
          }
        });
      },
      (exists, callback) => {
        if (exists) callback();
        else {
          client.indices.putTemplate({
            name: 'bismuth',
            create: true,
            body: require('./template.json')
          }, error => {
            if (error) callback(error);
            else callback();
          });
        }
      }
    ], error => {
      if (error) reject(error);
      resolve();
    });
  });
}

function init() {
  return checkTemplate().then(() =>
    ifNotExistsThenCreateDoc(index, type, id, require('./default')).then(load).then(autoRefresh)
  );
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
        diff(config, resp._source);
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

function diff(origin, current) {
  if (isEmpty(origin) || isEmpty(current)) {
    return;
  }
  for (let key of Object.keys(current)) {
    if (isEqual(origin[key], current[key])) {
      continue;
    }
    configChangeEmitter.emit(key, current);
  }
}

function onChanged(item, callback) {
  configChangeEmitter.on(item, callback);
}

module.exports = {
  init,
  load,
  update,
  config: () => config,
  onChanged
};
