import {test, expect, Locator} from "@playwright/test";

import {LoginPage} from "../pages/LoginPage";
import {PdtsPage} from "../pages/PdtsPage";

test("Verify all products are displayed", async({page})=>{

let loginPage = new LoginPage(page);
let pdtsPage = new PdtsPage(page);

await page.goto("https://www.saucedemo.com/")

await loginPage.enterUserName("standard_user");
await loginPage.enterPassword("secret_sauce");

await loginPage.clickLoginBtn();

await expect(await pdtsPage.shoppingCarIconExist()).toBeVisible();

// Sauce Labs Backpack
await expect(await pdtsPage.BackPackPdtText()).toBeVisible();
await expect(await pdtsPage.BackPackPrice()).toHaveText("$29.99");
await expect(await pdtsPage.BackPackAddToCartBtn()).toBeVisible();

// Sauce Labs Bike Light
await expect(await pdtsPage.BikeLightPdtText()).toBeVisible();
await expect(await pdtsPage.BikeLightPrice()).toHaveText("$9.99");
await expect(await pdtsPage.BikeLightAddToCartBtn()).toBeVisible();

// other products

})