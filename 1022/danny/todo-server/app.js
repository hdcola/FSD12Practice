require('dotenv').config();
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const errorResponse = require('./middlewares/error-response');
const validateToken = require('./middlewares/validate-token');

var app = express();

const db = require('./models');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

app.use(errorResponse);

db.sequelize.sync();

module.exports = app;
