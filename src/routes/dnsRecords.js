let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.dnsRecords(req.param('page', 1), req.param('limit', 10)).then(dns_records => res.json({
    dns_records,
    meta: dns_records.meta
  }));
});

module.exports = router;
