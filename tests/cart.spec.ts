import { test, expect } from "@playwright/test";

// --- MODULE: Cart ---

// --- TEST-11 : Add an item to the cart from the catalog ---
test("TEST-11 : Add an item to the cart from the catalog", async ({ page }) => {
  // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

  // Verifying that we are on the catalog
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2. Add an item to the cart (the backpack)
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 3. Verify that the cart badge increments and displays "1"
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText("1");
});

// --- TEST-12 : Add an item from its product detail page ---
test("TEST-12 : Add an item from its product detail page", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verifying that we are on the catalog
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2. Click on the product name (the backpack) to open its details page
  await page.locator('[data-test="item-4-title-link"]').click();

  // Verifying that we are indeed on the product details page
  await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);

  // 3. Click "Add to cart" from this details page
  await page.locator('[data-test="add-to-cart"]').click();

  // 4. Verify that the cart badge increments and displays "1"
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText("1");
});

// --- TEST-13 : Remove an item from the cart from the catalog ---
test("TEST-13 : Remove an item from the cart from the catalog", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verifying that we are on the catalog
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2. First, add an item to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  // Check that the badge displays "1"
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("1");

  // 3. Click "Remove" to take the item out of the cart
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // 4. Verify that the cart badge has disappeared
  await expect(cartBadge).not.toBeVisible();
});