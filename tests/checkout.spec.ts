import { test, expect } from "@playwright/test";

// --- MODULE: Checkout ---

// --- TEST-14 : Fill out the checkout form with valid information ---
test("TEST-14 : Fill out the checkout form with valid information", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verifying that we are on the catalog
  await expect(page).toHaveURL(/.*inventory.html/);

  // 2. Add an item to the cart and go to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  // 3. Click the "Checkout" button
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // 4. Fill out the personal information form
  await page.locator('[data-test="firstName"]').fill("Jean");
  await page.locator('[data-test="lastName"]').fill("Dupont");
  await page.locator('[data-test="postalCode"]').fill("75001");

  // 5. Click "Continue"
  await page.locator('[data-test="continue"]').click();

  // 6. Verify that you successfully reach the order summary step
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

// --- TEST-15 : Submit the checkout form with empty fields ---
test("TEST-15 : Submit the checkout form with empty fields", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // 2. Go to the cart and click "Checkout"
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // 3. Click "Continue" directly without filling in anything
  await page.locator('[data-test="continue"]').click();

  // 4. Verify that an error message is displayed
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Error: First Name is required");
});

// --- TEST-16 : Verify the order summary (price, taxes, total) ---
test("TEST-16 : Verify the order summary (price, taxes, total)", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // 2. Add the backpack to the cart and proceed to checkout
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // 3. Fill out the form and continue
  await page.locator('[data-test="firstName"]').fill("Jean");
  await page.locator('[data-test="lastName"]').fill("Dupont");
  await page.locator('[data-test="postalCode"]').fill("75001");
  await page.locator('[data-test="continue"]').click();

  // 4. Verify that you are on the order summary page
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  // 5. Check the item subtotal ($29.99 for the backpack)
  const subTotalLabel = page.locator('[data-test="subtotal-label"]');
  await expect(subTotalLabel).toHaveText("Item total: $29.99");

  // 6. Verify that the final total amount, including taxes, is displayed (the backpack at $29.99 + taxes = $32.39)
  const totalLabel = page.locator('[data-test="total-label"]');
  await expect(totalLabel).toHaveText("Total: $32.39");
});

// --- TEST-17 : Complete the order successfully and generate the PDF ---
test("TEST-17 : Complete the order successfully", async ({ page }) => {
  // 1. Log in
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // 2. Add an item, go to the cart, and start the checkout process
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // 3. Fill out the information form and continue
  await page.locator('[data-test="firstName"]').fill("Jean");
  await page.locator('[data-test="lastName"]').fill("Dupont");
  await page.locator('[data-test="postalCode"]').fill("75001");
  await page.locator('[data-test="continue"]').click();

  // 4. Confirm the order by clicking "Finish"
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await page.locator('[data-test="finish"]').click();

  // 5. Verify that the confirmation page is reached and that the message is displayed.
  await expect(page).toHaveURL(/.*checkout-complete.html/);
  
  const completeHeader = page.locator('[data-test="complete-header"]');
  await expect(completeHeader).toBeVisible();
  await expect(completeHeader).toHaveText("Thank you for your order!");

  // 6. Also check the detailed order confirmation message
  const completeText = page.locator('[data-test="complete-text"]');
  await expect(completeText).toBeVisible();
  await expect(completeText).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

  // 7. Test the downloading or generation of the order PDF
  const pdfButton = page.locator('text=Generate PDF order');
  await expect(pdfButton).toBeVisible();

  // Wait for the download event triggered by clicking the button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    pdfButton.click()
  ]);

  // You can verify that the file has a name or that it has been properly initialized.
  console.log(`Fichier PDF téléchargé : ${download.suggestedFilename()}`);
});