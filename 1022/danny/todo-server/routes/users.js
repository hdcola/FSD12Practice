const express = require('express');
const router = express.Router();
const {
  createUser,
  loginByEmailAndPassword,
} = require('../service/user-service');

router.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await createUser({ email, password });
    res.json({ sucess: true, message: 'User created!', token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await loginByEmailAndPassword({ email, password });
    res.json({ sucess: true, message: 'Authentication successful!', token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
