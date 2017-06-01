let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.httpRecords(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(http_records => res.json({
    http_records,
    meta: http_records.meta
  }));
});

module.exports = router;
