let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.fileinfoRecords(req.param('page', 1), req.param('limit', 10)).then(fileinfo_records => res.json({
    fileinfo_records,
    meta: fileinfo_records.meta
  }));
});

module.exports = router;
