const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('admin area');
});

module.exports = router;
