import { test, expect } from '../../src/fixtures';

test.describe('OrangeHRM Login', () => {

  // Use a fresh page without storageState for login tests
  test('should show login form elements', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});