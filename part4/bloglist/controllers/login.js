const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordMatch =  user
    ? await bcrypt.compare(password, user.password) : false;

  if (!user || !passwordMatch) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userTokenData = {
    id      : user.id,
    username: user.username,
  };

  const token = jwt.sign(userTokenData, config.SECRET, {
    expiresIn: config.TOKEN_EXPIRE,
  });

  response.status(200).json({
    name: user.name, username: user.username, token,
  });
});

module.exports = loginRouter;
