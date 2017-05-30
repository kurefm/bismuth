let router = require('express').Router();
let service = require('../service/node');

router.get('/', (req, res) => {
  service.nodes().then(nodes => res.json({ nodes }));
});

module.exports = router;
