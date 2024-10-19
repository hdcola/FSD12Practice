const { User } = require('../models');
const bycrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const ApiError = require('../errors/api-error');

async function createUser({ username, password }) {
  const saltRounds = 10;
  const hash = await bycrypt.hash(password, saltRounds);
  try {
    const newUser = await User.create({
      username,
      password: hash,
    });
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

async function getUsers() {
  return User.findAll();
}

module.exports = { createUser, getUsers };
