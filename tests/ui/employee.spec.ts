import { test, expect } from '../../src/fixtures/base.fixture';
// import { EmployeePage } from '../../src/pages/pim/employee.page';

test.describe('OrangeHRM PIM - Employee Management', () => {

  test.beforeEach(async ({ authenticatedPage, employeePage }) => {
    await employeePage.goto();
  });

  test.describe('Employee List', () => {
    test('should display employee list with records', async ({ employeePage }) => {
      const count = await employeePage.getTableRowCount();
      expect(count).toBeGreaterThan(0);
    });

    test('should display record count', async ({ employeePage }) => {
      const text = await employeePage.getRecordCountText();
      expect(text).toContain('Records Found');
    });

    test('should display Add button', async ({ employeePage }) => {
      await expect(employeePage.addButton).toBeVisible();
    });
  });

  test.describe('Add Employee', () => {
    test('should add a new employee successfully', async ({ authenticatedPage, employeePage }) => {
      await employeePage.clickAddEmployee();
      const employeeId = await employeePage.addEmployee('Test', 'Playwright');

      await expect(authenticatedPage).toHaveURL(/viewPersonalDetails/);
      expect(employeeId).toBeTruthy();
    });
  });

  test.describe('Search Employee', () => {
    test('should search and find existing employee', async ({ employeePage }) => {
      await employeePage.searchByName('test');
      const count = await employeePage.getTableRowCount();
      expect(count).toBeGreaterThan(0);
    });

    test('should show no records for unknown employee', async ({ employeePage }) => {
      await employeePage.searchByName('XXXXXXXXXXX');
      await expect(employeePage.noRecordsFound).toBeVisible({timeout: 8000});
    });
  });
});