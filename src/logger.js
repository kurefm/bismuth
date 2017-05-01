const { cwd } = require('process');
const { resolve, dirname } = require('path');
const { existsSync, mkdirSync } = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('./config').winston;
const { assign } = Object;

let baseConfig = config.logger;
let logFilePath = resolve(cwd(), baseConfig.dailyRotateFile.filename);
let logFileDir = dirname(logFilePath);

if (!existsSync(logFileDir)) {
  mkdirSync(logFileDir);
}
baseConfig.dailyRotateFile.filename = logFilePath;

let loggers = {};

config.labels.forEach(label => {
  let loggerName = label.toLowerCase();
  let loggerConfig = assign({}, baseConfig);
  loggerConfig.console.label = label;
  loggerConfig.dailyRotateFile.label = label;
  winston.loggers.add(loggerName, loggerConfig);
  loggers[loggerName] = winston.loggers.get(loggerName);
});

module.exports = loggers;
