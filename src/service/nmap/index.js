const localConfig = require('config');
const remoteConfig = require('../config');
const { scheduleJob, cancelJob } = require('../job-scheduler.js');
const { waterfall } = require('async');
const { has, merge } = require('lodash');
const logger = require('../../logger').nmap;
const { exec } = require('../../utils');
const { client } = require('../es');
const { resultProcess } = require('./queue');

const JOBKEY = 'nmap:hostDetection';

function checkTemplate() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.indices.getTemplate((error, response) => {
          if (error) callback(error);
          else {
            callback(null, has(response, 'nmap'));
          }
        });
      },
      (exists, callback) => {
        if (exists) callback();
        else {
          client.indices.putTemplate({
            name: 'nmap',
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

function addJob() {
  scheduleJob(JOBKEY, remoteConfig.config()['hs:hostDetection:cron'], () => {
    let config = remoteConfig.config();
    logger.debug(`Host detection run on network: ${config['hs:network']}`);
    exec([localConfig.nmap.bin, '-oX', '-', config['hs:network'], '-sP'])
      .then(resultProcess.push, logger.error);
  });
}

function startScan() {
  addJob();
  remoteConfig.onChanged('hs:hostDetection:cron', () => {
    cancelJob(JOBKEY);
    addJob();
    logger.info('Job [hostDetection:cron] reschedule');
  });
}

function init() {
  return checkTemplate().then(startScan);
}

module.exports = merge({
  init
}, require('./searcher'));
