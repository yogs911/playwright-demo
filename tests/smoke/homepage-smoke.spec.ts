import { test, expect } from '@playwright/test';

test.describe('Homepage Product Flow', () => {
  test('should navigate to product detail and verify UI', async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:8080/');

    // Click on any product (assumes products are clickable elements, e.g., with a class or role)
    // Update selector as needed for your app structure

    await page.getByRole('link').nth(2).click();
    await page.getByRole('button', { name: 'Add To Cart' }).click();

    // Verify add to cart button is displayed
    await expect(page.locator('[data-testid="add-to-cart"], .add-to-cart, button:has-text("Add to Cart")')).toBeVisible();
  });
});
