let router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    version: '0.1.0'
  });
});

module.exports = router;
