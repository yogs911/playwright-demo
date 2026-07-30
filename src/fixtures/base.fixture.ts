import { test as base, Page } from '@playwright/test';
import { APIClient } from '../api/apiClient';
import { UserAPI } from '../api/user.api';
import { ProductAPI } from '../api/product.api';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { EmployeePage } from '../pages/pim/employee.page';

type CustomFixtures = {
  apiClient: APIClient;
  userAPI: UserAPI;
  productAPI: ProductAPI;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeePage: EmployeePage;
  authenticatedPage: Page;
};

export const test = base.extend<CustomFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new APIClient(request);
    await use(client);
  },

  userAPI: async ({ apiClient }, use) => {
    const api = new UserAPI(apiClient);
    await use(api);
  },

  productAPI: async ({ apiClient }, use) => {
    const api = new ProductAPI(apiClient);
    await use(api);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

   // Logs in before use, tears down after
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await page.waitForURL(/dashboard/);
    await use(page);
  },

  dashboardPage: async ({ authenticatedPage }, use) => {
    await use(new DashboardPage(authenticatedPage));
  },

  employeePage: async ({ authenticatedPage }, use) => {
    await use(new EmployeePage(authenticatedPage));
  }
});

export { expect } from '@playwright/test';