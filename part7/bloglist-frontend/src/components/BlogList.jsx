import Blog from './Blog';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => (
  <div style={{ marginTop: '20px' }}>
    {blogs.map((blog) => (
      <div key={blog.id} style={styles}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </div>
    ))}
  </div>
);

export default BlogList;

const styles = {
  border: '2px solid #000',
  padding: '10px 0 10px 8px',
  margin: '10px 0',
};
