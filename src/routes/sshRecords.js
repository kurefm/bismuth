let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.sshRecords(req.param('page', 1), req.param('limit', 10)).then(ssh_records => res.json({
    ssh_records,
    meta: ssh_records.meta
  }));
});

module.exports = router;
