const { safeLoad, safeDump } = require('js-yaml');
const { readFile, writeFile } = require('fs');
const { suricata } = require('config');
const remoteConfig = require('../config');
const { merge, isArray } = require('lodash');
const { WORKDIR, CONFIG_FILE } = require('./lancher');

let origin = {};

function loadOrigin() {
  return new Promise((resolve, reject) => {
    readFile(suricata['config-path'], (err, data) => {
      if (err) reject(err);
      origin = safeLoad(data);
      resolve(origin);
    });
  });
}

function mixConfig(config) {
  let mixed = merge(origin, config, (objValue, srcValue) => {
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
    writeFile(CONFIG_FILE, safeDump(mixConfig({
      vars: {
        'address-groups': rConfig['ids:vars:address-groups'],
        'port-groups': rConfig['ids:vars:port-groups']
      },
      'rule-files': rConfig['ids:enable-rules']
    })), err => {
      if (err) reject(err);
      else resolve(err);
    });
  });
}

module.exports = {
  loadOrigin,
  generateConfigFile
};
