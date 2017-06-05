let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.fileinfoRecords(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(fileinfo_records => res.json({
    fileinfo_records,
    meta: fileinfo_records.meta
  })).catch(() => res.json({ fileinfo_records: [] }));
});

module.exports = router;
