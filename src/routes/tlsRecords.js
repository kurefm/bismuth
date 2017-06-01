let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.tlsRecords(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(tls_records => res.json({
    tls_records,
    meta: tls_records.meta
  }));
});

module.exports = router;
