import {test, expect} from "@playwright/test";

import {LoginPage} from "../pages/LoginPage";

test("login with empty username & password",async({page})=>{

let loginPage = new LoginPage(page);

await page.goto("https://www.saucedemo.com/");

await loginPage.clickLoginBtn();

await expect(await loginPage.errorMessageExist()).toHaveText("Epic sadface: Username is required");


})