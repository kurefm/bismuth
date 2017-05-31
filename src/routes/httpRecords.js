let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.httpRecords(req.param('page', 1), req.param('limit', 10)).then(http_records => res.json({
    http_records,
    meta: http_records.meta
  }));
});

module.exports = router;
