import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('link').nth(2).click();
  await page.getByRole('button', { name: 'Add To Cart' }).click();
});