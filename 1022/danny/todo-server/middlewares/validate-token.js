const jwt = require('jsonwebtoken');
const apiError = require('../utils/api-error');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    throw apiError.unauthorized('Token is not provided');
  }
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    throw apiError.unauthorized('Invalid token');
  }
};

module.exports = validateToken;
