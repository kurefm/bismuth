let router = require('express').Router();
let service = require('../service/node');

router.get('/', (req, res) => {
  service.nodes().then(nodes => res.json({ nodes }));
});

router.get('/:id/config', (req, res) => {
  service.getConfig(req.param('id')).then(config => res.json({ config }));
});

router.put('/:id/config', (req, res) => {
  service.updateConfig(req.param('id'), req.body.config)
    .then(() => service.getConfig(req.param('id')))
    .then(config => res.json({ config }));
});

module.exports = router;
