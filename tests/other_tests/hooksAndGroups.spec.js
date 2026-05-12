import { test, expect } from '@playwright/test';

test.describe('Regression testing suite', () => {
test.beforeAll(async ({ browser }) => {
    global.context=await browser.newContext();
})

test.beforeEach(async () => {
    //Create a new page from global context
    global.page=await global.context.newPage();
    await global.page.goto('https://www.saucedemo.com');
    await global.page.locator('[data-test="username"]').click();
    await global.page.locator('[data-test="username"]').fill('standard_user');
    await global.page.locator('[data-test="password"]').click();
    await global.page.locator('[data-test="password"]').fill('secret_sauce');
    await global.page.locator('[data-test="login-button"]').click();
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
});

test.afterEach(async () => {
    await global.page.close();
});

test.afterAll(async () => {
    await global.context.close();
});

test('buy and order', async () => {
    await global.page.locator('[data-test="item-0-img-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('[data-test="item-4-title-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="remove"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.getByText('Get your testing superhero on').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="continue-shopping"]').click();
    await global.page.locator('[data-test="inventory-container"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="checkout"]').click();
    await global.page.locator('[data-test="firstName"]').click();
    await global.page.locator('[data-test="firstName"]').fill('Nadia');
    await global.page.locator('[data-test="firstName"]').press('Tab');
    await global.page.locator('[data-test="lastName"]').fill('Castillo');
    await global.page.locator('[data-test="lastName"]').press('Tab');
    await global.page.locator('[data-test="postalCode"]').fill('123456789');
    await global.page.locator('[data-test="continue"]').click();
    await global.page.locator('[data-test="finish"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
});

test('logout', async () => {
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
    await global.page.getByRole('button', { name: 'Open Menu' }).click();
    await global.page.locator('[data-test="logout-sidebar-link"]').click();
    await global.page.waitForURL('https://www.saucedemo.com');
});

});

test.describe('Integration testing suite', () => {
test.beforeAll(async ({ browser }) => {
    global.context=await browser.newContext();
})

test.beforeEach(async () => {
    //Create a new page from global context
    global.page=await global.context.newPage();
    await global.page.goto('https://www.saucedemo.com');
    await global.page.locator('[data-test="username"]').click();
    await global.page.locator('[data-test="username"]').fill('standard_user');
    await global.page.locator('[data-test="password"]').click();
    await global.page.locator('[data-test="password"]').fill('secret_sauce');
    await global.page.locator('[data-test="login-button"]').click();
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
});

test.afterEach(async () => {
    await global.page.close();
});

test.afterAll(async () => {
    await global.context.close();
});

test('buy and order', async () => {
    await global.page.locator('[data-test="item-0-img-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('[data-test="item-4-title-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="remove"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.getByText('Get your testing superhero on').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="continue-shopping"]').click();
    await global.page.locator('[data-test="inventory-container"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="checkout"]').click();
    await global.page.locator('[data-test="firstName"]').click();
    await global.page.locator('[data-test="firstName"]').fill('Nadia');
    await global.page.locator('[data-test="firstName"]').press('Tab');
    await global.page.locator('[data-test="lastName"]').fill('Castillo');
    await global.page.locator('[data-test="lastName"]').press('Tab');
    await global.page.locator('[data-test="postalCode"]').fill('123456789');
    await global.page.locator('[data-test="continue"]').click();
    await global.page.locator('[data-test="finish"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
});

test('logout', async () => {
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
    await global.page.getByRole('button', { name: 'Open Menu' }).click();
    await global.page.locator('[data-test="logout-sidebar-link"]').click();
    await global.page.waitForURL('https://www.saucedemo.com');
});

});

test.describe('Smoke testing suite', () => {
test.beforeAll(async ({ browser }) => {
    global.context=await browser.newContext();
})

test.beforeEach(async () => {
    //Create a new page from global context
    global.page=await global.context.newPage();
    await global.page.goto('https://www.saucedemo.com');
    await global.page.locator('[data-test="username"]').click();
    await global.page.locator('[data-test="username"]').fill('standard_user');
    await global.page.locator('[data-test="password"]').click();
    await global.page.locator('[data-test="password"]').fill('secret_sauce');
    await global.page.locator('[data-test="login-button"]').click();
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
});

test.afterEach(async () => {
    await global.page.close();
});

test.afterAll(async () => {
    await global.context.close();
});

test('buy and order', async () => {
    await global.page.locator('[data-test="item-0-img-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.locator('[data-test="item-4-title-link"]').click();
    await global.page.locator('[data-test="add-to-cart"]').click();
    await global.page.locator('[data-test="remove"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
    await global.page.getByText('Get your testing superhero on').click();
    await global.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="continue-shopping"]').click();
    await global.page.locator('[data-test="inventory-container"]').click();
    await global.page.locator('[data-test="shopping-cart-link"]').click();
    await global.page.locator('[data-test="checkout"]').click();
    await global.page.locator('[data-test="firstName"]').click();
    await global.page.locator('[data-test="firstName"]').fill('Nadia');
    await global.page.locator('[data-test="firstName"]').press('Tab');
    await global.page.locator('[data-test="lastName"]').fill('Castillo');
    await global.page.locator('[data-test="lastName"]').press('Tab');
    await global.page.locator('[data-test="postalCode"]').fill('123456789');
    await global.page.locator('[data-test="continue"]').click();
    await global.page.locator('[data-test="finish"]').click();
    await global.page.locator('[data-test="back-to-products"]').click();
});

test('logout', async () => {
    await global.page.waitForURL('https://www.saucedemo.com/inventory.html');
    await global.page.getByRole('button', { name: 'Open Menu' }).click();
    await global.page.locator('[data-test="logout-sidebar-link"]').click();
    await global.page.waitForURL('https://www.saucedemo.com');
});

});