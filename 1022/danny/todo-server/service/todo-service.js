const { Todos } = require('../models');
const ApiError = require('../utils/api-error');
const { Sequelize } = require('sequelize');
const yup = require('yup');

const todoSchema = yup.object().shape({
  task: yup.string().required(),
  dueDate: yup.date().required(),
});

async function createTodo({ ownerId, task, dueDate }) {
  try {
    await todoSchema.validate({ task, dueDate }, { abortEarly: false });
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

  try {
    const newTodo = await Todos.create({
      ownerId,
      task,
      dueDate,
    });
    return newTodo;
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

async function getTodosByOwnerId(ownerId) {
  const todos = await Todos.findAll({ where: { ownerId } });
  const todosJson = todos.map((todo) => todo.toJSON());
  return todosJson;
}

async function getTodoById(todoId) {
  const todo = await Todos.findByPk(todoId);
  if (!todo) {
    throw ApiError.notFound('Todo not found');
  }
  return todo;
}

module.exports = { createTodo, getTodosByOwnerId, getTodoById };
