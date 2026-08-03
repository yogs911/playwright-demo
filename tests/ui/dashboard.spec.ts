import { test, expect } from '@fixtures/base.fixture';
import * as allure from 'allure-js-commons'

test.describe('OrangeHRM Dashboard', () => {

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('should display dashboard widgets', async ({ dashboardPage }) => {
    await allure.owner('QA Team');
    await allure.severity('critical');
    await allure.tags('ui', 'dashboard', 'smoke');

    await allure.step('Verify dashboard widgets are visible', async () => {
      await expect(dashboardPage.timeAtWork).toBeVisible();
      await expect(dashboardPage.myActions).toBeVisible();
      await expect(dashboardPage.quickLaunch).toBeVisible();
    });
  });

  test('should navigate to PIM via sidebar', async ({ dashboardPage, page }) => {
    await allure.severity('normal');
    await allure.tags('ui', 'dashboard', 'regression');

    await allure.step('Click PIM in sidebar', async () => {
      await dashboardPage.sidebar.navigateTo('PIM');
    });

    await allure.step('Verify PIM URL', async () => {
      await expect(page).toHaveURL(/pim/);
    });
  });

  test('should navigate to Admin via sidebar', async ({ dashboardPage, page }) => {
    await allure.severity('normal');
    await allure.tags('ui', 'dashboard', 'regression');

    await allure.step('Click Admin in sidebar', async () => {
      await dashboardPage.sidebar.navigateTo('Admin');
    });

    await allure.step('Verify Admin URL', async () => {
      await expect(page).toHaveURL(/admin/);
    });
  });
});