import Blog from './Blog';

const Blogs = ({ sortedBlogs, blogs, setBlogs, user, like, notify }) => (
  <div style={{ marginTop: '20px' }}>
    {sortedBlogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        like={like(blog)}
        notify={notify}
      />
    ))}
  </div>
);

export default Blogs;
