const express = require('express');
const router = express.Router();
const { createUser } = require('../services/user-service');

/* GET users listing. */
router.post('/register', async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await createUser({ username, password });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
