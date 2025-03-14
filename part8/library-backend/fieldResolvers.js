const fieldResolvers = {
  Author: {
    bookCount: ({ books }) => books.length,
  }
}
module.exports = fieldResolvers;
