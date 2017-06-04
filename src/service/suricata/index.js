const { checkWorkDir, start, reload } = require('./lancher');
const { loadOrigin, generateConfigFile, autoPushAvailableRules } = require('./config');
const { merge } = require('lodash');
const { waterfall } = require('async');
const { has } = require('lodash');
const { client } = require('../es');
const remoteConfig = require('../config');

function checkTemplate() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.indices.getTemplate((error, response) => {
          if (error) callback(error);
          else {
            callback(null, has(response, 'suricata'));
          }
        });
      },
      (exists, callback) => {
        if (exists) callback();
        else {
          client.indices.putTemplate({
            name: 'suricata',
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

function reconfig() {
  generateConfigFile().then(reload);
}

function init() {
  return checkTemplate().then(() =>
    Promise.all([checkWorkDir(), loadOrigin()])
      .then(generateConfigFile)
      .then(start)
      .then(autoPushAvailableRules)
      .then(() => {
        remoteConfig.onChanged('ids:vars:address-groups', reconfig);
        remoteConfig.onChanged('ids:vars:port-groups', reconfig);
        remoteConfig.onChanged('ids:enable-rules', reconfig);
      })
  );
}

module.exports = merge({
  init
}, require('./searcher'));
