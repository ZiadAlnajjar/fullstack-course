const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote, createBlog, deleteBlog, likeBlog, blogsElem } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'John Doe',
        username: 'john',
        password: 'doe'
      }
    });
    
    await page.goto('');
  })
  
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText(/log in to application/i)).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  })
  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'john', 'doe')
      
      await expect(page.getByText('John Doe logged in')).toBeVisible()
    })
    
    test.only('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'john', 'wrong pass')
      
      const errorDiv = await page.locator('.alert.alert-error')
      await expect(errorDiv).toContainText(/incorrect username or password/i)
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('John Doe logged in')).not.toBeVisible()
    })
  })
  
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'john', 'doe')
    })
    
    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'blog example',
        author: 'jane doe',
        url: 'https://example.com',
      }
      await createBlog(page, blog)
      await expect(page.getByText('a new blog blog example by jane doe added'))
        .toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: /blog example/i }))
        .toBeVisible()
    })
    
    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        const blogs = [
          {
            title: 'blog example',
            author: 'jane doe',
            url: 'https://example.com',
          },
          {
            title: 'lorem Ipsum',
            author: 'lorem doe',
            url: 'https://example2.com',
          },
          {
            title: 'cat Ipsum',
            author: 'cat doe',
            url: 'https://example3.com',
          },
        ]
        await createBlog(page, blogs[0])
        await createBlog(page, blogs[1])
        await createBlog(page, blogs[2])
      })
      
      test('a blog can be liked', async ({ page }) => {
        const filter = { hasText: /blog example/i };
        likeBlog(page, filter)
        await expect(blogsElem(page, filter).getByText(/likes 1/i)).toBeVisible()
      })
      
      test('a blog can be deleted', async ({ page }) => {
        const filterText = /lorem Ipsum/i
        await deleteBlog(page, { hasText: filterText })
        
        const blogsList = blogsElem(page);
        await expect(blogsList.getByText(filterText)).not.toBeAttached()
        await expect(blogsList).toHaveCount(2)
      })
      
      test('shows remove button only for blog creator', async ({ page, request }) => {
        const blogElem = blogsElem(page, { hasText: /cat Ipsum/i });
        await blogElem.getByRole('button', { name: /view/i }).click()
        await expect(blogElem.getByRole('button', { name: /remove/i })).toBeAttached()
        
        await request.post('/api/users', {
          data: {
            name: 'Jane Doe',
            username: 'jane',
            password: 'doe'
          }
        });
        page.getByRole('button', { name: /logout/i }).click()
        loginWith(page, 'jane', 'doe')
        
        await blogElem.getByRole('button', { name: /view/i }).click()
        await expect(blogElem.getByRole('button', { name: /remove/i })).not.toBeAttached()
      })
      
      test('blogs are sorted by likes in desc order', async ({ page }) => {
        await likeBlog(page, { hasText: /blog example/i });
        await likeBlog(page, { hasText: /lorem Ipsum/i });
        await likeBlog(page, { hasText: /lorem Ipsum/i });
        await likeBlog(page, { hasText: /lorem Ipsum/i });
        await likeBlog(page, { hasText: /cat Ipsum/i });
        await likeBlog(page, { hasText: /cat Ipsum/i });
        
        const blogsList = blogsElem(page)
        await expect(blogsList.nth(0)).toHaveText(/lorem Ipsum.*?likes 3/i)
        await expect(blogsList.nth(1)).toHaveText(/cat Ipsum.*?likes 2/i)
        await expect(blogsList.nth(2)).toHaveText(/blog example.*?likes 1/i)
      })
    })
  })
})
