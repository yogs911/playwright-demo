import { test, expect } from '@fixtures/base.fixture';
import * as allure from "allure-js-commons";

test.describe('OrangeHRM PIM - Employee Management', () => {

  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test.describe('Employee List', () => {
    test('should display employee list with records', async ({ employeePage }) => {
      await allure.owner('QA Team');
      await allure.severity('critical');
      await allure.tags('ui', 'pim', 'smoke');

      await allure.step('Verify employee table has records', async () => {
        const count = await employeePage.getTableRowCount();
        expect(count).toBeGreaterThan(0);
      });
    });

    test('should display record count', async ({ employeePage }) => {
      await allure.severity('normal');
      await allure.tags('ui', 'pim', 'smoke');

      await allure.step('Verify record count text', async () => {
        const text = await employeePage.getRecordCountText();
        expect(text).toContain('Records Found');
      });
    });

    test('should display Add button', async ({ employeePage }) => {
      await allure.severity('minor');
      await allure.tags('ui', 'pim');

      await allure.step('Verify Add button is visible', async () => {
        await expect(employeePage.addButton).toBeVisible();
      });
    });
  });

  test.describe('Add Employee', () => {
    test('should add a new employee successfully', async ({ employeePage, page }) => {
      await allure.owner('QA Team');
      await allure.severity('critical');
      await allure.tags('ui', 'pim', 'regression');

      await allure.step('Click Add Employee button', async () => {
        await employeePage.clickAddEmployee();
      });

      const employeeId = await allure.step('Fill and submit employee form', async () => {
        return employeePage.addEmployee('Test', 'Playwright');
      });

      await allure.step('Verify redirect to personal details', async () => {
        await expect(page).toHaveURL(/viewPersonalDetails/);
        expect(employeeId).toBeTruthy();
      });
    });
  });

  test.describe('Search Employee', () => {
    test('should search and find existing employee', async ({ employeePage }) => {
      await allure.severity('critical');
      await allure.tags('ui', 'pim', 'regression');

      await allure.step('Search for Admin employee', async () => {
        await employeePage.searchByName('Admin');
      });

      await allure.step('Verify results returned', async () => {
        const count = await employeePage.getTableRowCount();
        expect(count).toBeGreaterThan(0);
      });
    });

    test('should show no records for unknown employee', async ({ employeePage }) => {
      await allure.severity('normal');
      await allure.tags('ui', 'pim', 'regression');

      await allure.step('Search for non-existent employee', async () => {
        await employeePage.searchByName('XXXXXXXXXXX');
      });

      await allure.step('Verify no records message', async () => {
        await expect(employeePage.noRecordsFound).toBeVisible({ timeout: 10000 });
      });
    });
  });
});