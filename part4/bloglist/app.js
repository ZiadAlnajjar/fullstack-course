const config = require('./utils/config');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');

const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.DB_URI);

mongoose.connect(config.DB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs',
  middleware.userExtractor,
  blogsRouter,
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
