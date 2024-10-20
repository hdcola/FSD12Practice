require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const errorResponse = require('./middlewares/error-response');
const validateToken = require('./middlewares/validate-token');

const app = express();

const db = require('./models');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/', validateToken, indexRouter);

app.use(errorResponse);

db.sequelize.sync();

module.exports = app;
