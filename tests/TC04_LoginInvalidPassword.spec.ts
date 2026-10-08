import {test, expect} from "@playwright/test";


import {LoginPage} from "../pages/LoginPage";

test("login with invalid password",async({page})=>{


let loginPage = new LoginPage(page);

await page.goto("https://www.saucedemo.com/");

await loginPage.enterUserName("standard_user");
await loginPage.enterPassword("invalid_password");

await loginPage.clickLoginBtn();

await expect(await loginPage.errorMessageExist()).toHaveText("Epic sadface: Username and password do not match any user in this service");


})