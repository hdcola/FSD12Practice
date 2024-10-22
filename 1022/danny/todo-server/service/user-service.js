const { Users } = require('../models');
const bycrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const ApiError = require('../utils/api-error');
const { generateToken } = require('../utils/jwt');
const yup = require('yup');

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(50),
});

async function createUser({ email, password }) {
  // check if email and password are valid
  try {
    await userSchema.validate({ email, password }, { abortEarly: false });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const detailedErrors = err.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      throw ApiError.badRequest('Validation Error', detailedErrors);
    }
    throw err;
  }

  const saltRounds = 10;
  const hash = await bycrypt.hash(password, saltRounds);
  try {
    const newUser = await Users.create({
      email,
      password: hash,
    });
    const token = generateToken({ email: newUser.email, id: newUser.id });
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

async function loginByEmailAndPassword({ email, password }) {
  const user = await Users.findOne({ where: { email } });
  console.log(user);
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  const match = await bycrypt.compare(password, user.password);
  if (!match) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  const token = generateToken({ email: email, id: user.id });
  return token;
}

module.exports = { createUser, loginByEmailAndPassword };
