class InvalidTokenError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'InvalidTokenError';
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = InvalidTokenError;
