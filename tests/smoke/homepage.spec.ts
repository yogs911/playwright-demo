import { test, expect } from '@playwright/test';

test.describe('Smoke | Online Boutique', () => {
  test('homepage loads and shows products', async ({ page }) => {
    // Go to homepage
    await page.goto('/');

    // Basic page health check
    await expect(page).toHaveTitle(/Online Boutique/i);

    // Product cards should be visible
    const products = page.locator('[class*="hot-product-card"]');

    await expect(products.first()).toBeVisible();
  });
});
