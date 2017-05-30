const { spawn } = require('child_process');
const { suricata } = require('config');
const process = require('process');
const { join } = require('path');
const { exists, mkdir } = require('fs');
const { waterfall } = require('async');

const WORKDIR = join(process.cwd(), 'suricata');
const CONFIG_FILE = join(WORKDIR, 'config.yaml');

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

module.exports = {
  WORKDIR,
  CONFIG_FILE,
  checkWorkDir
};
