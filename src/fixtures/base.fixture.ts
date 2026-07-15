import { test as base } from '@playwright/test';
import { APIClient } from '../api/apiClient';
import { UserAPI } from '../api/user.api';
import { ProductAPI } from '@api/index';

// Define the shape of our custom fixtures
type CustomFixtures = {
  apiClient: APIClient;
  userAPI: UserAPI;
  productAPI: ProductAPI;
};

// Extend Playwright's base test with our fixtures
export const test = base.extend<CustomFixtures>({
  // apiClient fixture — creates a new APIClient for each test
  apiClient: async ({ request }, use) => {
    const client = new APIClient(request);
    await use(client);
  },

  // userAPI fixture — depends on apiClient fixture
  userAPI: async ({ apiClient }, use) => {
    const api = new UserAPI(apiClient);
    await use(api);
  },

  productAPI: async ({ apiClient }, use) => {
    const api = new ProductAPI(apiClient);
    await use(api);
  },
  
});

export { expect } from '@playwright/test';