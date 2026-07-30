import { test, expect } from '../../src/fixtures';

test.describe('OrangeHRM Dashboard', () => {

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('should display dashboard widgets', async ({dashboardPage }) => {
    await expect(dashboardPage.timeAtWork).toBeVisible();
    await expect(dashboardPage.myActions).toBeVisible();
    await expect(dashboardPage.quickLaunch).toBeVisible();
  });

  test('should navigate to PIM via sidebar', async ({ authenticatedPage, dashboardPage }) => {
    await dashboardPage.sidebar.navigateTo('PIM');
    await expect(authenticatedPage).toHaveURL(/pim/);
  });

  test('should navigate to Admin via sidebar', async ({ authenticatedPage, dashboardPage }) => {
    await dashboardPage.sidebar.navigateTo('Admin');
    await expect(authenticatedPage).toHaveURL(/admin/);
  });
});