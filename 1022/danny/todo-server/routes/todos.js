const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodosByOwnerId,
  getTodoById,
} = require('../service/todo-service');
const ApiError = require('../utils/api-error');

router.get('/', async function (req, res, next) {
  const todos = await getTodosByOwnerId(req.user.id);
  res.json(todos);
});

router.post('/', async function (req, res, next) {
  const { task, dueDate } = req.body;
  try {
    const newTodo = await createTodo({
      ownerId: req.user.id,
      task,
      dueDate,
    });
    res.json(newTodo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const todo = await getTodoById(id);
    if (todo.ownerId !== req.user.id) {
      const error = ApiError.forbidden(
        'You are not allowed to delete this todo'
      );
      next(error);
    } else {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
