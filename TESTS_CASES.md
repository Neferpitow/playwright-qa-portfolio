# 🧪 Test Plan & Test Cases - SauceDemo

This project presents an automated test suite built with **Playwright** and **TypeScript** targeting the e-commerce demo site [SauceDemo](https://www.saucedemo.com/).

## 📋 Test Cases List

| ID | Module | Test Description | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-01** | Authentication | Successful login with a valid user (`visual_user`) | Redirected to the inventory page | ✅ Passed |
| **TEST-02** | Authentication | Login failure with an incorrect password | Display a blocking error message | ✅ Passed|
| **TEST-03** | Authentication | Login failure with an invalid username | Display a blocking error message | ✅ Passed |
| **TEST-04** | Authentication | Login failure with empty fields | Display a field validation error | ⏳ ✅ Passed|
| **TEST-05** | Catalog | Correct display of the product list (images, prices, titles) | All visual elements are properly displayed | ⏳ ✅ Passed|
| **TEST-06** | Catalog | Product sorting (Name A to Z) | Products are sorted according to the selection | ⏳ ✅ Passed|
| **TEST-07** | Catalog | Product sorting (Name Z to A) | Products are sorted according to the selection | ⏳ ✅ Passed|
| **TEST-08** | Catalog | Product sorting (Price low to high) | Products are sorted according to the selection | ⏳ ✅ Passed|
| **TEST-09** | Catalog | Product sorting (Price high to low) | Products are sorted according to the selection | ⏳ ✅ Passed|
| **TEST-10** | Catalog | Click on a product to view its detailed description | Open the product detail page | ⏳ ✅ Passed|
| **TEST-11** | Cart | Add an item to the cart from the catalog | Cart badge increments (changes to "1") | ⏳ Pending |
| **TEST-12** | Cart | Add an item from its product detail page | Cart badge increments correctly | ⏳ Pending |
| **TEST-13** | Cart | Remove an item from the cart (catalog or cart page) | Badge updates or item disappears | ⏳ Pending |
| **TEST-14** | Checkout | Fill out the checkout form with valid information | Proceed to the order overview step | ⏳ Pending |
| **TEST-15** | Checkout | Submit the checkout form with empty fields | Display input validation error messages | ⏳ Pending |
| **TEST-16** | Checkout | Verify the order summary (price, taxes, total) | Total amount calculation is accurate | ⏳ Pending |
| **TEST-17** | Checkout | Complete the order successfully | Display confirmation page "THANK YOU FOR YOUR ORDER" | ⏳ Pending |
| **TEST-18** | Navigation | Log out via the side menu | Redirected back to the initial login page | ⏳ Pending |