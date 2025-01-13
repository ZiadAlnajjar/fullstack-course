import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlogForm from './AddBlogForm';

describe('<AddBlogForm />', () => {
  let container;
  let addBlogHandler;

  beforeEach( () => {
    const blogs = [{
      'id': '67767306732dcb71f4f32864',
      'author': 'this is an author',
      'likes': 10,
      'title': 'this is a title',
      'url': 'thi is a url',
      'user': {
        id: '677081e90d5bc5184859c76b',
        name: 'admin',
        username: 'admin',
      },
    }];

    addBlogHandler = vi.fn();
    const setBlogs = vi.fn();
    const notify = vi.fn();

    container = render(
      <AddBlogForm
        addBlogHandler={addBlogHandler}
        blogs={blogs}
        setBlogs={setBlogs}
        notify={notify}
      />).container;
  });

  test('on creating new blog, form event handler recieves correct data', async () => {
    const user = userEvent.setup();

    const newBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
    };

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const authorInput = screen.getByRole('textbox', { name: /author/i });
    const urlInput = screen.getByRole('textbox', { name: /url/i });

    const createBtn = screen.getByRole('button', { name: /create/i });

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);

    await user.click(createBtn);

    const mockCalls = addBlogHandler.mock.calls;
    expect(mockCalls).toHaveLength(1);
    expect(mockCalls[0][0]).toStrictEqual(newBlog);
  });
});
