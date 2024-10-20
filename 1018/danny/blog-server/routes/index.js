const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const user = req.user;
  if (user) {
    res.json({ message: `Welcome to the blog server, ${user.username}!` });
    return;
  }
  res.json({ message: 'Welcome to the blog server' });
});

module.exports = router;
