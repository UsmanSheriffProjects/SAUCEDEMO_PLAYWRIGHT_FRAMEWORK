import {test, expect, Locator, Page} from "@playwright/test";

export class LoginPage
{

page: Page;

userName: Locator;
password: Locator;

loginBtn: Locator;

errorMsg: Locator;

constructor(page: Page)
{
this.page=page;
this.userName=page.locator("#user-name");
this.password=page.locator("#password");
this.loginBtn=page.locator("#login-button");
this.errorMsg=page.locator("h3[data-test='error']");
}

async enterUserName(userId: string)
{
    await this.userName.fill(userId);
}

async enterPassword(pass: string)
{
    await this.password.fill(pass);
}

async clickLoginBtn()
{
    await this.loginBtn.click();
}

async errorMessageExist()
{
    return this.errorMsg;
}

}