let router = require('express').Router();
let service = require('../service/suricata');

router.get('/', (req, res) => {
  service.alerts(req.param('page', 1), req.param('limit', 10)).then(alerts => res.json({
    alerts,
    meta: alerts.meta
  }));
});

module.exports = router;
