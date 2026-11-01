import { test, expect } from "@playwright/test";

// --- MODULE: Catalog / Inventory ---

// --- TEST-05 : Correct display of the product ---
test("TEST-05: Correct display of the product list (images, prices, titles)", async ({ page }) => {
    // 1. Log in first to access the inventory catalog page
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Verify successful redirection to the inventory page
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // 3. VERIFICATION: Ensure that product elements are properly displayed
    const inventoryItems = page.locator(".inventory_item");
    
    // Check that the expected number of products is displayed (SauceDemo has 6 items)
    await expect(inventoryItems).toHaveCount(6);

    // Specific verification for the first product (title, image, and price must be visible)
    const firstItem = inventoryItems.first();
    await expect(firstItem.locator(".inventory_item_name")).toBeVisible();
    await expect(firstItem.locator("img.inventory_item_img")).toBeVisible();
    await expect(firstItem.locator(".inventory_item_price")).toBeVisible();

    });

// --- TEST-06 : Sort A to Z ---
test("TEST-06: Product sorting (Name A to Z)", async ({ page }) => {
    // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Action: Select A to Z sorting ("az")
    await page.locator(".product_sort_container").selectOption("az");

    // 3. Verification: The first product on the list should be the “Sauce Labs Backpack”
    const firstItemName = page.locator(".inventory_item_name").first();
    await expect(firstItemName).toHaveText("Sauce Labs Backpack");
});

// --- TEST-07 : Sort Z to A ---
test("TEST-07: Product sorting (Name Z to A)", async ({ page }) => {
    // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Action: Select Z to A sorting ("za")
    await page.locator(".product_sort_container").selectOption("za");

    // 3. Verification: The first product on the list should be the "Test.allTheThings() T-Shirt (Red)"
    const firstItemName = page.locator(".inventory_item_name").first();
    await expect(firstItemName).toHaveText("Test.allTheThings() T-Shirt (Red)");
});

// --- TEST-08 : Sort Price low to high ---
test("TEST-08: Product sorting (Price low to high)", async ({ page }) => {
    // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Action: Select Price low to high sorting ("lohi")
    await page.locator(".product_sort_container").selectOption("lohi");

    // 3. Verification: The first product on the list should be the "Sauce Labs Onesie" and its price "$7.99"
    const firstItemName = page.locator(".inventory_item_name").first();
    await expect(firstItemName).toHaveText("Sauce Labs Onesie");

    const firstItemPrice = page.locator(".inventory_item_price").first();
    await expect(firstItemPrice).toHaveText("$7.99");
});

// --- TEST-09 : Sort Price high to low ---
test("TEST-09: Product sorting (Price high to low)", async ({ page }) => {
    // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Action: Select Price high to low sorting ("hilo")
    await page.locator(".product_sort_container").selectOption("hilo");

    // 3. Verification: The first product on the list should be the "Sauce Labs Fleece Jacket" and its price "$49.99"
    const firstItemName = page.locator(".inventory_item_name").first();
    await expect(firstItemName).toHaveText("Sauce Labs Fleece Jacket");

    const firstItemPrice = page.locator(".inventory_item_price").first();
    await expect(firstItemPrice).toHaveText("$49.99");
});

// --- TEST-10 : Click on a product to view its detailed description ---
test("TEST-10: Click on a product to view its detailed description", async ({ page }) => {
    // 1. Log in
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // 2. Action: Click on the product name ("Sauce Labs Backpack")
    await page.locator(".inventory_item_name", { hasText: "Sauce Labs Backpack" }).click();

    // 3. Verification: The product detail page should open and display the correct title
    const detailTitle = page.locator(".inventory_details_name");
    await expect(detailTitle).toHaveText("Sauce Labs Backpack");
});