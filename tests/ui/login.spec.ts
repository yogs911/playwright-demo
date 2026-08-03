import { test, expect } from '@fixtures/base.fixture';
import * as allure from 'allure-js-commons'

test.describe('OrangeHRM Login', () => {

  test('should show login form elements', async ({ loginPage }) => {
    await allure.owner('QA Team');
    await allure.severity('critical');
    await allure.tags('ui', 'login', 'smoke');

    await loginPage.goto();

    await allure.step('Verify login form elements are visible', async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await allure.owner('QA Team');
    await allure.severity('critical');
    await allure.tags('ui', 'login', 'regression');

    await loginPage.goto();

    await allure.step('Enter invalid credentials', async () => {
      await loginPage.login('invalid', 'wrongpassword');
    });

    await allure.step('Verify error message is shown', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });
});