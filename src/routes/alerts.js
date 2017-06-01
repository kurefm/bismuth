let router = require('express').Router();
let service = require('../service/suricata');
let { get } = require('lodash');

router.get('/', (req, res) => {
  service.alerts(get(req, 'query.page', 1), get(req, 'query.limit', 10)).then(alerts => res.json({
    alerts,
    meta: alerts.meta
  }));
});

module.exports = router;
