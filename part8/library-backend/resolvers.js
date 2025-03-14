const queries = require('./queries');
const mutations = require('./mutations');
const fieldResolvers = require('./fieldResolvers');
const subscriptions = require('./subscriptions');

const resolvers = {
  Query: queries,
  Mutation: mutations,
  Subscription: subscriptions,
  ...fieldResolvers,
}

module.exports = resolvers;
