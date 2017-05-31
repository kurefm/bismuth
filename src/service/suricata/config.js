const { safeLoad, safeDump } = require('js-yaml');
const { readFile, writeFile, readdir } = require('fs');
const { suricata, bismuth: { config: { index, type } } } = require('config');
const remoteConfig = require('../config');
const { mergeWith, isArray } = require('lodash');
const { WORKDIR, CONFIG_FILE } = require('./lancher');
const { client } = require('../es');
const { scheduleJob } = require('../job-scheduler');
const { getId } = require('../../utils');
const logger = require('../../logger').suricata;

let origin = {};

let id = getId();

function loadOrigin() {
  return new Promise((resolve, reject) => {
    readFile(suricata['config-file'], (err, data) => {
      if (err) reject(err);
      origin = safeLoad(data);
      resolve(origin);
    });
  });
}

function mixConfig(config) {
  let mixed = mergeWith(origin, config, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
  });
  mixed['default-log-dir'] = WORKDIR;

  return mixed;
}

function generateConfigFile() {
  let rConfig = remoteConfig.config();
  return new Promise((resolve, reject) => {
    writeFile(CONFIG_FILE, fixConfig(safeDump(mixConfig({
      vars: {
        'address-groups': rConfig['ids:vars:address-groups'],
        'port-groups': rConfig['ids:vars:port-groups']
      },
      'rule-files': rConfig['ids:enable-rules']
    }), {
        noCompatMode: true
      })), err => {
        if (err) reject(err);
        else resolve();
      });
  });
}

function fixConfig(yamlString) {
  yamlString = yamlString.replace(/\ null/g, '');
  return '%YAML 1.1\n---\n\n' + yamlString;
}

function getRules() {
  return new Promise((resolve, reject) => {
    readdir(suricata['rules-path'], (err, rules) => {
      if (err) reject(err);
      else resolve(rules.filter(rule => rule.endsWith('rules')));
    });
  });
}

function autoPushAvailableRules() {
  scheduleJob('suricata:pushAvailableRules', suricata['push-rules-cron'], () => {
    getRules().then(rules => client.update({
      index,
      type,
      id,
      body: {
        doc: {
          'ids:available-rules': rules
        }
      }
    })).then(() => logger.debug('Push available rules'));
  });
}

module.exports = {
  loadOrigin,
  generateConfigFile,
  autoPushAvailableRules
};
