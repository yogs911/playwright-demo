import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import * as dotenv from 'dotenv';
import * as path from 'node:path';

console.log('#####inside config######')

dotenv.config({ path: path.resolve(process.cwd(), `./config/.env.${process.env.ENV || 'dev'}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  use: {
    baseURL: process.env.ORANGEHRM_URL || 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],

  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
          environment: process.env.ENV || 'dev',
          base_url: process.env.BASE_URL || 'https://reqres.in',
        },
      },
    ],
    process.env.CI ? ['blob'] : ['html', { open: 'never' }],
  ],
});