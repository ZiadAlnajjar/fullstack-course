const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { PASSWORD_MIN_LENGTH } = require('../utils/config');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  if (password.length < PASSWORD_MIN_LENGTH) {
    return response.status(400).json({
      error: `password is shorter than minimum length (${PASSWORD_MIN_LENGTH})`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    password: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});


module.exports = usersRouter;
