const { spawn } = require('child_process');
const { suricata, logstash } = require('config');
const process = require('process');
const { join } = require('path');
const { exists, mkdir } = require('fs');
const { waterfall } = require('async');

const WORKDIR = join(process.cwd(), 'suricata');
const CONFIG_FILE = join(WORKDIR, 'config.yaml');
const logger = require('../../logger');
const os = require('os');

let suricataProc;
let logstashProc;

function checkWorkDir() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => exists(WORKDIR, exists => callback(null, exists)),
      (exists, callback) => {
        if (exists) callback();
        else mkdir(WORKDIR, callback);
      }
    ], err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function getNetIf() {
  return Object.keys(os.networkInterfaces()).filter(netif => netif !== 'lo');
}

function start() {
  let suricataArgs = ['-c', CONFIG_FILE];
  getNetIf().forEach(netif => suricataArgs.push('-i', netif));
  suricataProc = spawn(suricata.bin, suricataArgs);
  suricataProc.stdout.on('data', data => logger.suricata.info(data.toString()));
  suricataProc.stderr.on('data', data => logger.suricata.error(data.toString()));

  logstashProc = spawn(logstash.bin, ['-f', logstash['config-file']]);
  logstashProc.stdout.on('data', data => logger.logstash.info(data.toString()));
  logstashProc.stderr.on('data', data => logger.logstash.error(data.toString()));

}

function reload() {
  suricataProc.kill('SIGUSR2');
}

function stop() {
  suricataProc.kill();
  logstashProc.kill();
}

module.exports = {
  WORKDIR,
  CONFIG_FILE,
  checkWorkDir,
  start,
  reload,
  stop
};
