import { ALL_BOOKS } from './queries';

export const updateBookCache = (cache, addedBook) => {
  const uniqByTitle = (book) => {
    const distinct = new Set();
    return book.filter(({ title }) =>
      distinct.has(title) ? false : distinct.add(title));
  }
  
  const { genres } = addedBook;
  
  for (let i = 0; i <= genres.length; i++) {
    const currentGenre =
      i === genres.length
        ? ''
        : genres[i];
    
    cache.updateQuery(
      { query: ALL_BOOKS, variables: { genre: currentGenre } },
      ({ allBooks }) => ({
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }),
    );
  }
}
