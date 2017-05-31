let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.tlsRecords(req.param('page', 1), req.param('limit', 10)).then(tls_records => res.json({
    tls_records,
    meta: tls_records.meta
  }));
});

module.exports = router;
