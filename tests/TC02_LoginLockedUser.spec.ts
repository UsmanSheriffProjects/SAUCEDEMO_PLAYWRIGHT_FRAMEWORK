import {test, expect} from "@playwright/test";


import {LoginPage} from "../pages/LoginPage";

test("login with locked user",async({page})=>{


let loginPage = new LoginPage(page);

await page.goto("https://www.saucedemo.com/");

await loginPage.enterUserName("locked_out_user");
await loginPage.enterPassword("secret_sauce");

await loginPage.clickLoginBtn();

await expect(await loginPage.errorMessageExist()).toHaveText("Epic sadface: Sorry, this user has been locked out.");


})