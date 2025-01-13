import Blog from './Blog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  let container;
  let like;

  beforeEach(() => {
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

    const user = {
      name: 'admin',
      username: 'admin',
    };

    like = vi.fn();
    const setBlogs = vi.fn();
    const notify = vi.fn();

    container = render(
      <Blog
        blog={blogs[0]}
        like={like}
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        notify={notify}
      />).container;
  });

  test('at start only the blog title and author are displayed, while additional details are hidden', () => {
    screen.getByText('this is a title', { exact: false });
    screen.getByText('this is an author', { exact: false });

    const likesElem = screen.queryByText('likes 10');
    const urlElem = screen.queryByText('thi is a url');
    expect(likesElem).not.toBeVisible();
    expect(urlElem).not.toBeVisible();
  });

  test('after clicking view button, additional blog details are displayed', async () => {
    const user = userEvent.setup();

    const toggleBtn = screen.getByRole('button', { name: /view/i });
    await user.click(toggleBtn);

    const extendableDiv = container.querySelector('.togglable');
    expect(extendableDiv).not.toHaveStyle('display: none');

    const likesElem = screen.queryByText('likes 10');
    const urlElem = screen.queryByText('thi is a url');
    expect(likesElem).toBeVisible();
    expect(urlElem).toBeVisible();
  });

  test('clicking the like button twice, increaments likes by two', async () => {
    const user = userEvent.setup();

    const likeBtn = container.querySelector('#like');

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(like.mock.calls).toHaveLength(2);
  });
});
