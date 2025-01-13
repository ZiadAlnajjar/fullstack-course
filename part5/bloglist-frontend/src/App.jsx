import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import UserSection from './components/UserSection';
import Alert from './components/Alert';
import Heading from './components/Heading';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/Togglable';
import { resetState, waitSync } from './utils/helpers';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const blogFormTogglableRef = useRef();

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if(loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    const sorted = blogs.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      } else if (a.likes < b.likes) {
        return 1;
      }

      return 0;
    });
    setSortedBlogs(sorted);
  }, [blogs]);

  const addBlogHandler = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    blogFormTogglableRef.current.toggleVisibility();
    notify(`a new blog ${savedBlog.title} by ${savedBlog.author} added`, 'success');

    return savedBlog;
  };

  const like = (blog) => async () => {
    const { id, likes } = blog;

    const likedBlog = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1,
    };

    const updatedBlog = await blogService.update(id, likedBlog);
    updatedBlog.user = blog.user;
    setBlogs(blogs.map((entry) => entry.id === id ? updatedBlog : entry));
  };

  const notifySuccess = (message, sec) => notify(message, 'success', sec);

  const notifyError = (message, sec) => notify(message, 'error', sec);

  const notify = (message, severity, sec = 3) => {
    setAlert({ message, severity });
    waitSync(() => {
      setAlert({ message: '', severity: '' });
    }, sec);
  };


  if (!user) {
    return (
      <div>
        <Alert message={alert.message} severity={alert.severity} />
        <Heading lvl={2} text='log in to application' />
        <LoginForm setUser={setUser} notify={notify} />
      </div>
    );
  }

  return (
    <>
      <Alert message={alert.message} severity={alert.severity} />
      <Heading lvl={2} text='blogs' />
      <UserSection user={user} setUser={setUser} />
      <Togglable btnLabel='new blog' ref={blogFormTogglableRef}>
        <div>
          <Heading lvl={2} text='create new' />
          <AddBlogForm
            addBlogHandler={addBlogHandler}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </div>
      </Togglable>
      <Blogs
        sortedBlogs={sortedBlogs}
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        like={like}
        notify={notify}
      />
    </>
  );
};

export default App;
