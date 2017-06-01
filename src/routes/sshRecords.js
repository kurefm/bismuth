let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.sshRecords(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(ssh_records => res.json({
    ssh_records,
    meta: ssh_records.meta
  }));
});

module.exports = router;
