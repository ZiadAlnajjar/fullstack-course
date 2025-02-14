const User = require('../models/user');
const logger = require('./logger');
const EntityNotFoundException = require('../exceptions/EntityNotFoundException');
const InvalidTokenError = require('../exceptions/InvalidTokenError');
const { getDecodedToken } = require('./utils');


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = async (request, response, next) => {
  const auth = request.get('authorization');
  const authType = /^Bearer\s/i;

  if (auth && authType.test(auth)) {
    const token = auth.replace(authType, '');
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const { id: userId } = getDecodedToken(request);
  const user = await User.findById(userId);

  if (!user) {
    throw new EntityNotFoundException('user');
  }

  request.user = user;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error instanceof EntityNotFoundException) {
    return response.status(404).end();
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError' || error instanceof InvalidTokenError) {
    return response.status(401).json({ error: 'invalid or missing token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'expired token' });
  }

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
