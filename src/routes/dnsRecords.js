let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.dnsRecords(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(dns_records => res.json({
    dns_records,
    meta: dns_records.meta
  })).catch(() => res.json({ dns_records: [] }));
});

module.exports = router;
