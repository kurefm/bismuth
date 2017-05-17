const service = require('../service/job-scheduler');
const logger = require('../logger').http;

let router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    jobs: service.jobs()
  });
});

module.exports = router;
