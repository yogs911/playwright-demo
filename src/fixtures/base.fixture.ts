import { test as base, Page, request } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
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
  apiClient: async ({}, use) => {
    const requestContext = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://reqres.in',
    });
    const client = new APIClient(requestContext);
    await use(client);
    await requestContext.dispose();
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