import { test, expect, Page, Locator } from "@playwright/test";

export class PdtsPage {

    page: Page;

    backPackPdtText: Locator;
    backPackAddToCartBtn: Locator;
    backPackPrice: Locator;

    bikeLightPdtText: Locator;
    bikeLightPrice: Locator;
    bikeLightAddToCartBtn: Locator;

    filterDropdown: Locator;

    pdts_Price: Locator;
    pdts_Name: Locator;

    shoppingCartIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        this.backPackPdtText = page.locator("//div[text()='Sauce Labs Backpack']");
        this.backPackAddToCartBtn = page.locator("#add-to-cart-sauce-labs-backpack");
        this.backPackPrice = page.locator("//div[text()='Sauce Labs Backpack']/following::div[@class='inventory_item_price'][1]");

        this.bikeLightPdtText = page.locator("//div[text()='Sauce Labs Bike Light']");
        this.bikeLightPrice = page.locator("//div[text()='Sauce Labs Bike Light']/following::div[@class='inventory_item_price'][1]");
        this.bikeLightAddToCartBtn = page.locator("#add-to-cart-sauce-labs-bike-light");

        this.filterDropdown = page.getByRole("combobox");

        this.pdts_Price = page.locator(".inventory_item_price");
        this.pdts_Name = page.locator(".inventory_item_name");

        this.shoppingCartIcon = page.locator(".shopping_cart_link");
    }

    async shoppingCarIconExist() {
        return this.shoppingCartIcon;
    }


    async BackPackPdtText() {
        return this.backPackPdtText;
    }

    async BackPackAddToCartBtn() {
        return this.backPackAddToCartBtn;
    }

    async BackPackPrice() {
        return this.backPackPrice;
    }


    async BikeLightPdtText() {
        return this.bikeLightPdtText;
    }

    async BikeLightPrice() {
        return this.bikeLightPrice;
    }

    async BikeLightAddToCartBtn() {
        return this.bikeLightAddToCartBtn;
    }

    async selectFilter(option: string) {
        await this.filterDropdown.selectOption(option);
    }

    async validateSortingByPriceLowToHigh() {

        let pdtsArray = await this.pdts_Price.all();

        let prices: number[] = [];

        // for of loop
        for (let p of pdtsArray) {
            const priceText = await p.innerText()

            const price = Number(priceText?.replace('$', ''));

            prices.push(price);
        }

        // Verify ascending order
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }

    }


    async validateSortingByPriceHighToLow() {

        let pdtsArray = await this.pdts_Price.all();

        let prices: number[] = [];

        // for of loop
        for (let p of pdtsArray) {
            const priceText = await p.innerText()

            const price = Number(priceText?.replace('$', ''));

            prices.push(price);
        }

        // Verify ascending order
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }

    }

    async validateSortingByNameAtoZ() {

        // Get all product names
        const productNames = await this.pdts_Name.allTextContents();

        // Create a sorted copy
        const sortedNames = [...productNames].sort((a, b) =>
            a.localeCompare(b)
        );

        // Verify actual order matches alphabetical order
        expect(productNames).toEqual(sortedNames);

    }


    async validateSortingByNameZtoA() {

        // Get all product names
        const productNames = await this.pdts_Name.allTextContents();

        const actualNames = productNames.map(name => name.trim());

        // Create expected Z to A order
        const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a)
        );

        // Verify ordering
        expect(actualNames).toEqual(expectedNames);

    }

}
