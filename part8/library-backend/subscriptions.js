const pubsub = require('./pubsub');

const subscriptions = {
  bookAdded: {
    subscribe: () =>
      pubsub.asyncIterableIterator('BOOK_ADDED'),
  },
};

module.exports = subscriptions;
