import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import UserNavSection from './components/UserNavSection';
import Login from './components/Login';
import { useApolloClient, useSubscription } from '@apollo/client';
import Recommended from './components/Recommended';
import { BOOK_ADDED } from './queries';
import { updateBookCache } from './utils';

const App = () => {
  const client = useApolloClient();
  
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState('');
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data: { data }, client }) => {
      updateBookCache(client.cache, data.bookAdded);
    }
  })
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors");
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <UserNavSection setPage={setPage} token={token} logout={logout} />
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Login
        show={page === "login"}
        token={token}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommended show={page === "recommended"} />
    </div>
  );
};

export default App;
