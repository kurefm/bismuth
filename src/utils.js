const { spawn } = require('child_process');
const { parseString } = require('xml2js');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const process = require('process');
const { join } = require('path');
const uuid = require('uuid/v1');

const IDFILE = join(process.cwd(), '.identity');

function exec(cmd) {
  return new Promise((resolve, reject) => {
    let proc = spawn(cmd[0], cmd.slice(1));
    let stdout = '';
    let stderr = '';
    proc.on('exit', code => {
      if (code !== 0) {
        reject(stderr);
      }
      resolve(stdout);
    });
    proc.on('error', err => reject(err));
    proc.stdout.on('data', data => stdout += data);
    proc.stderr.on('data', data => stderr += data);
  });
}

function xml2js(xml, options) {
  return new Promise((resolve, reject) => {
    parseString(xml, options, (err, r) => {
      if (err) reject(err);
      resolve(r);
    });
  });
}

class ActionBlock {
  constructor(action) {
    this.action = action;
  }
}

function getId() {
  if (existsSync(IDFILE)) {
    return readFileSync(IDFILE).toString().trim();
  }
  let id = uuid();
  writeFileSync(IDFILE, id);
  return id;
}

function underscored(str) {
  return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

module.exports = {
  exec,
  xml2js,
  ActionBlock,
  getId,
  underscored
};
