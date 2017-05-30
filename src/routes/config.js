const configService = require('../service/config');
const logger = require('../logger').http;

let router = require('express').Router();

router.get('/', (req, res) => {
  res.json(configService.config());
});

router.put('/', (req, res) => {
  return configService.update(req.body.config)
    .then(configService.load)
    .then(config => res.json(config));
});

module.exports = router;
