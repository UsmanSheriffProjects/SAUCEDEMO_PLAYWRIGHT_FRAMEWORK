import {test, expect} from "@playwright/test";


import {LoginPage} from "../pages/LoginPage";

test("login with invalid user",async({page})=>{


let loginPage = new LoginPage(page);

await page.goto("https://www.saucedemo.com/");

await loginPage.enterUserName("invalid_user");
await loginPage.enterPassword("secret_sauce");

await loginPage.clickLoginBtn();

await expect(await loginPage.errorMessageExist()).toHaveText("Epic sadface: Username and password do not match any user in this service");


})