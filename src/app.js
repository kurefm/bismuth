const express = require('express');
const bodyParser = require('body-parser')
const { http: { port, host } } = require('./config');
const logger = require('./logger').http;
const morgan = require('morgan');
const { readdirSync } = require('fs');
const { join, basename } = require('path');
// require('./service/nmap');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// load routes
let routeDir = join(__dirname, 'routes');
readdirSync(routeDir).forEach(filename => {
  if (!filename.endsWith('.js')) return;
  let route = require(join(routeDir, filename));
  let routeName = basename(filename, '.js');
  app.use(routeName === 'index' ? '/' : '/' + routeName, route);
});

require('./loader').init();

app.listen(port, host, () => logger.info(`http service run on ${host}:${port}`));


