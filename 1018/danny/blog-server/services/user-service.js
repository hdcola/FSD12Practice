const { User } = require('../models');
const bycrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const ApiError = require('../utils/api-error');
const { generateToken } = require('../utils/jwt');

async function createUser({ username, password }) {
  const saltRounds = 10;
  const hash = await bycrypt.hash(password, saltRounds);
  try {
    const newUser = await User.create({
      username,
      password: hash,
    });
    const token = generateToken({ username: newUser.username });
    return token;
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      const errors = err.errors.map((e) => ({
        message: e.message,
        field: e.path,
      }));
      throw ApiError.badRequest('Validation Error', errors);
    } else {
      throw err;
    }
  }
}

async function loginByUsernameAndPassword({ username, password }) {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw ApiError.unauthorized('Invalid username or password');
  }
  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    throw ApiError.unauthorized('Invalid username or password');
  }
  const token = generateToken({ username: username });
  return token;
}

module.exports = { createUser, loginByUsernameAndPassword };
