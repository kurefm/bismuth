/*eslint-disable no-console*/
const { env } = process;
const { join } = require('path');
const { readFileSync } = require('fs');
const yaml = require('js-yaml');

let configPath = join(__dirname, 'conf',
  env['NODE_ENV'] === 'production' ? 'production.yml': 'development.yml'
);

module.exports = (function () {
  try {
    console.log(`[Config] Load file from ${configPath}`);
    return yaml.safeLoad(readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.log(`[Config] Load file from ${configPath} fail with `, e);
    return {};
  }
})();
