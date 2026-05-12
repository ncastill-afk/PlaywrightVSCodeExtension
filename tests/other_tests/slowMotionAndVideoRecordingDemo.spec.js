import {test, expect, chromium} from '@playwright/test';

test('Slow Motion and video recording Demo Test 1', async () => {

    //Launch browser
    const browser=await chromium.launch({
        headless:false,
        slowMo:500,
    });

    //Create a new incognito browser context
    const context=await browser.newContext({
        recordVideo:{
            dir:'./videos/',
            size:{width:800, height:600},
        },
    });

    //Create a new page inside context
    const page=await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com');
    //await page.pause();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    //await page.getByText('mandaa LastNameTest').click();
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    //Disponse context once it's no longer needed
    await context.close();

});