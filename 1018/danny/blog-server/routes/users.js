const express = require('express');
const router = express.Router();
const {
  createUser,
  loginByUsernameAndPassword,
} = require('../services/user-service');

/* GET users listing. */
router.post('/register', async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const token = await createUser({ username, password });
    res.json({ sucess: true, message: 'User created!', token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const token = await loginByUsernameAndPassword({ username, password });
    res.json({ sucess: true, message: 'Authentication successful!', token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
