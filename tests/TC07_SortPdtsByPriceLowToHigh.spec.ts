import {test, expect, Locator} from "@playwright/test";

import {LoginPage} from "../pages/LoginPage";
import { PdtsPage } from "../pages/PdtsPage";

test("Sort products by price — Low to High", async({page})=>{

let loginPage = new LoginPage(page);
let pdtsPage = new PdtsPage(page);

await page.goto("https://www.saucedemo.com/")

await loginPage.enterUserName("standard_user");
await loginPage.enterPassword("secret_sauce");

await loginPage.clickLoginBtn();

await expect(await pdtsPage.shoppingCarIconExist()).toBeVisible();

await pdtsPage.selectFilter("Price (low to high)");

await pdtsPage.validateSortingByPriceLowToHigh();

// await page.waitForTimeout(3000);

})