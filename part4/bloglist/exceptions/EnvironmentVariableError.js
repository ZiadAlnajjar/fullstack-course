class EnvironmentVariableError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'EnvironmentVariableError';
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = EnvironmentVariableError;
