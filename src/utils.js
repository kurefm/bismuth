const { spawn } = require('child_process');
const { parseString } = require('xml2js');

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

module.exports = {
  exec,
  xml2js
};
