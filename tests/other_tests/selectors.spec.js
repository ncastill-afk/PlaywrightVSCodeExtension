import {test, expect} from '@playwright/test';  

test('Selectors Demo', async ({page}) => {

    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.pause()

    //usando cualquier propiedad del objeto
    /*await page.click('id=username')
    await page.locator('id=username').fill('student')
    await page.locator('[id="username"]').fill('lala')
    await page.pause()

    //usando css selector
    await page.pause()
    await page.locator('#submit').click()
    
    await page.pause()*/

    //usando xpath
    await page.locator('//*[@id="username"]').fill('student')
    await page.pause()
    //await page.locator('//*[@id="password"]').fill('Password123')
    await page.getByLabel('Password').fill('Password123')
    await page.pause()
    await page.locator('//*[@id="submit"]').click()
    await page.pause()
    //usando Text
    await page.locator('text=Log out').click()
    await page.pause()


})