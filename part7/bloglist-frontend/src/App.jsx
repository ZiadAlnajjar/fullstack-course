import { useEffect, useMemo } from 'react';
import { useGetBlogsQuery } from './services/blogs';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import NotFound from './components/NotFound';
import Default from './layouts/Default';

const App = () => (
  <Default>
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/blogs/:id'
        element={<Blog />}
      />
      <Route
        path='/users'
        element={<Users />}
      />
      <Route
        path='/users/:id'
        element={<User />}
      />
      <Route path='/' element={<Blogs />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Default>
);


export default App;
