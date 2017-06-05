let router = require('express').Router();
let service = require('../service/suricata');
let { get, isEmpty } = require('lodash');

router.get('/', (req, res) => {
  let page = get(req, 'query.page', 1);
  let limit = get(req, 'query.limit', 10);
  let read = req.query.read;
  let query = {};
  if (!isEmpty(read)) {
    query.query = { term: { read: read } };
  }

  service.alerts(page, limit, query).then(alerts => res.json({
    alerts,
    meta: alerts.meta
  })).catch(() => res.json({ alerts: [] }));
});

router.get('/:id', (req, res) => {
  service.getAlert(req.params.id).then(alert => res.json({ alert }));
});

router.post('/:id/:status', (req, res) => {
  service.updateAlertRead(req.params.id, req.params.status === 'read')
    .then(() => res.status(204).end());
});

module.exports = router;
