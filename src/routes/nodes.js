const router = require('express').Router();
const service = require('../service/node');
const { merge } = require('lodash');

router.get('/', (req, res) => {
  service.nodes().then(nodes => res.json({ nodes }));
});

router.get('/:id/config', (req, res) => {
  service.getConfig(req.params.id).then(config => res.json({
    config: merge(config, { id: req.params.id })
  }));
});

router.put('/:id/config', (req, res) => {
  service.updateConfig(req.params.id, req.body.config)
    .then(() => service.getConfig(req.params.id))
    .then(config => res.json({
      config: merge(config, { id: req.params.id })
    }));
});

module.exports = router;
