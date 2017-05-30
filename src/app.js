require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger').base;
const { http: { port, host } } = require('config');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const { join, basename } = require('path');
// require('./service/nmap');
const app = express();

app.use(express.static('pubilc'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});



require('./loader').init(app).then(() => {
  app.listen(port, host, () => logger.info(`http service run on ${host}:${port}`));
});



