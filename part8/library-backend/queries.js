const Book = require('./models/book');
const Author = require('./models/author');

const queries = {
  me: (root, args, { currentUser }) => currentUser,
  bookCount: async () => (await Book.find()).length,
  authorCount: async () => (await Author.find()).length,
  allBooks: async (root, args) => {
    const filter = {};
    
    if (args.author) {
      filter.author = { $regex: new RegExp(args.author, 'i') };
    }
    
    if (args.genre) {
      filter.genres = { $in: [new RegExp(args.genre, 'i')] };
    }
    
    return Book.find(filter).populate('author', { books: 0 });
  },
  allAuthors: async () => await Author.find().populate('books', { author: 0 }),
  allGenres: async () => (await Book.aggregate([
    { $unwind: '$genres' },
    { $group: { _id: '$genres' } },
  ])).map(({ _id }) => _id)
}

module.exports = queries;
