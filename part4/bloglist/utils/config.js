require('dotenv').config();
const EnvironmentVariableError = require('../exceptions/EnvironmentVariableError');

const requiredEnvVars = ['APP_PORT', 'JWT_SECRET', 'DB_URI'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new EnvironmentVariableError(missingRequiredEnvVar(key));
  }
});

const {
  APP_PORT,
  DB_URI,
  TEST_DB_URI,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

if (NODE_ENV === 'test' && !TEST_DB_URI) {
  throw new EnvironmentVariableError(
    `App is running on "test" mode. ${missingRequiredEnvVar('TEST_DB_URI')}`);
}

const SECRET = JWT_SECRET;

const PASSWORD_MIN_LENGTH = 3;
const TOKEN_EXPIRE = 60 * 60;
const PORT = APP_PORT || 3001;

const dbUri = NODE_ENV === 'test'
  ? TEST_DB_URI
  : DB_URI;

const missingRequiredEnvVar = (key) => {
  return `Missing required environment variable: ${key}`;
};

module.exports = {
  SECRET,
  PORT,
  TOKEN_EXPIRE,
  PASSWORD_MIN_LENGTH,
  DB_URI: dbUri,
};
