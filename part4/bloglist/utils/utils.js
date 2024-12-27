const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const InvalidTokenError = require('../exceptions/InvalidTokenError');

const getDecodedToken = (request) => {
  const decodedToken = jwt.verify(request.token, SECRET);

  if(!decodedToken.id) {
    throw new InvalidTokenError();
  }

  return  decodedToken;
};

module.exports = {
  getDecodedToken,
};
