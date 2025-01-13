import { log } from 'node:util';

export const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: /login/i }).click();
}

export const createBlog = async (page, data) => {
  const { title, author, url } = data;
  
  await page.getByRole('button', { name: /new blog/i }).click();
  await page.getByRole('textbox', { name: /title/i }).fill(title);
  await page.getByRole('textbox', { name: /author/i }).fill(author);
  await page.getByRole('textbox', { name: /url/i }).fill(url);
  await page.getByRole('button', { name: /create/i }).click();
  
  await page.getByText(new RegExp(`${title} ${author}`, 'i')).waitFor();
}

export const blogsElem = (page, filter) =>
  page.locator('.blog').filter(filter);

export const viewBlog = async (blogElem) => {
  await blogElem.getByRole('button', { name: /view/i }).click()
}

export const likeBlog = async (page, filter) => {
  const blogElem = await blogsElem(page, filter);
  const viewBtn = blogElem.getByRole('button', { name: /view/i })
  if (await viewBtn.isVisible()) {
    await viewBtn.click();
  }
  const requestPromise = page.waitForResponse(response =>
    response.url().includes('/api/blogs')
    && response.request().method() === 'PUT'
    && response.status() === 200
  );
  await blogElem.getByRole('button', { name: /like/i }).click()
  await requestPromise;
}

export const deleteBlog = async (page, filter) => {
  const blogElem = await blogsElem(page, filter);
  const viewBtn = blogElem.getByRole('button', { name: /view/i })
  if (await viewBtn.isVisible()) {
    await viewBtn.click();
  }
  page.on('dialog', async dialog => await dialog.accept())
  await blogElem.getByRole('button', { name: /remove/i }).click()
}

export default {
  loginWith,
  createBlog,
  blogsElem,
  viewBlog,
  likeBlog,
  deleteBlog,
}
