import { test, expect } from "@playwright/test";

// --- TEST 01 : Connexion réussie ---
test("TEST-01: Devrait se connecter avec un utilisateur valide", async ({ page }) => {
    // On demande à Playwright d'aller sur le site SauceDemo en attendant bien que la page charge
    await page.goto("https://www.saucedemo.com/");

    // Je veux remplir la case Username et Password sur saucedemo
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    // Cliquer sur le bouton Login
    await page.locator("#login-button").click();

    // VÉRIFICATION : On s'assure qu'on est bien arrivés sur la page inventaire
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

});

// --- TEST 02 : Échec avec un mot de passe erroné ---
test("TEST-02: Devrait afficher une erreur avec un mauvais mot de passe", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("wrong_password");
    await page.locator("#login-button").click();

    // VÉRIFICATION : On s'assure qu'un message d'erreur rouge est bien visible à l'écran
    await expect(page.locator("[data-test='error']")).toBeVisible();

});  

// --- TEST 03 : Échec avec un nom d'utilisateur erroné ---
test("TEST-03: Devrait afficher une erreur avec un nom d'utilisateur erroné", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("wrong_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // VÉRIFICATION : Le message d'erreur doit s'afficher
    await expect(page.locator("[data-test='error']")).toBeVisible();

});  

// --- TEST 04 : Échec avec les champs vides ---
test("TEST-04: Devrait afficher une erreur si les champs sont vides", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#login-button").click();

    // VÉRIFICATION : Le message d'erreur "Username is required" doit apparaître
    await expect(page.locator("[data-test='error']")).toBeVisible();

}); 