const { Blog, User } = require('../models');
const ApiError = require('../utils/api-error');
const { Sequelize } = require('sequelize');
const yup = require('yup');

const createBlogSchema = yup.object().shape({
  title: yup.string().required().min(10),
  content: yup.string().required().min(20),
  userId: yup.number().required(),
});

async function createBlog({ title, content, userId }) {
  try {
    await createBlogSchema.validate({ title, content, userId });
  } catch (err) {
    throw ApiError.badRequest('Validation Error', err.errors);
  }
  try {
    const newBlog = await Blog.create({
      title,
      content,
      userId,
    });
    return newBlog;
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

async function getAllBlogs() {
  return await Blog.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'username'],
    },
  });
}

async function getBlogs({ userName }) {
  return await Blog.findAll({
    include: {
      model: User,
      where: { userName },
    },
  });
}

module.exports = { createBlog, getBlogs, getAllBlogs };
