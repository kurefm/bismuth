let router = require('express').Router();
let service = require('../service/nmap');

router.get('/', (req, res) => {
  service.hosts().then(hosts => res.json({ hosts }));
});

module.exports = router;
