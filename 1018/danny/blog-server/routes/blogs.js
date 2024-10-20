const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getAllBlogs,
} = require('../services/blogService');

router.get('/', async (req, res, next) => {
  const blogs = await getAllBlogs();
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const newBlog = await createBlog({ title, content, userId });
    res.json(newBlog);
  } catch (err) {
    next(err);
  }
});

// get blogs by user name
router.get('/user/:userName', async (req, res, next) => {
  const userName = req.params.userName;
  const blogs = await getBlogs({ userName });
  res.json(blogs);
});

module.exports = router;
