const { GraphQLError } = require('graphql/error');
const jwt = require('jsonwebtoken');
const pubsub = require('./pubsub');
const User = require('./models/user');
const Book = require('./models/book');
const Author = require('./models/author');
const queries = require('./queries');

const mutations = {
  createUser: async (root, { username, favoriteGenre }) => {
    const user = new User({ username, favoriteGenre, });
    
    return user.save()
      .catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          }
        })
      })
  },
  login: async (root, { username, password }) => {
    const user = await User.findOne({ username });
    
    if ( !user || password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      });
    }
    
    const userForToken = { username, id: user.id, }
    
    return {
      value: jwt.sign(
        userForToken, process.env.JWT_SECRET
      ),
    }
  },
  addBook: async (root, { title, published, genres, ...args }, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      })
    }
    
    try {
      const author =
        await Author.findOne({ name: new RegExp(args.author, 'i') })
        ?? await (new Author({ name: args.author, })).save();
      
      const book = new Book({
        title, published, genres, author: author.id,
      });
      const newBook = await book.save();
      
      author.books = author.books.concat(newBook.id);
      await author.save();
      
      const populatedBook = await newBook.populate('author', { books: 0 });

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook });

      return populatedBook;
    } catch (error) {
      throw new GraphQLError('Adding new book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          error,
        }
      })
    }
  },
  editAuthor: async (root, { name, setBornTo, }, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      })
    }
    
    return Author.findOneAndUpdate(
      { name: new RegExp(name, 'i') },
      { born: setBornTo },
      { new: true, runValidators: true }
    ).populate('books', { author: 0 })
      .catch((error) => {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          }
        });
      });
  },
}

module.exports = mutations;
