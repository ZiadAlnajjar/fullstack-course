class EntityNotFoundException extends Error {
  constructor(message, errorCode) {
    super(message);
    this.message = this.#formatMessage(message);
    this.name = 'EntityNotFoundException';
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }

  #formatMessage(message) {
    if(!message) {
      return 'entity not found';
    }

    if (message.split(' ').length === 1) {
      return `${message} not found`;
    }

    return message;
  }
}

module.exports = EntityNotFoundException;
