const express = require('express');
const router = express.Router();

/* GET auctions listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.patch('/:id', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
