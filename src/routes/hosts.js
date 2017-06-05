let router = require('express').Router();
let service = require('../service/nmap');

router.get('/', (req, res) => {
  service.hosts().then(hosts => res.json({ hosts }));
});

router.get('/:ip', (req, res) => {
  service.host(req.params.ip).then(host => res.json({ host }));
});

router.get('/:ip/ports', (req, res) => {
  service.ports(req.params.ip).then(ports => res.json({ ports }));
});

router.get('/:ip/os-history', (req, res) => {
  service.osHistory(req.params.ip).then(os => res.json({ os }));
});

router.get('/:ip/host-history', (req, res) => {
  service.hostHistory(req.params.ip).then(hosts => res.json({ hosts }));
});

module.exports = router;
