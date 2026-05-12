import test, {page, expect} from '@playwright/test';

test('Assertions Demo Test', async ({page}) => {
    await page.pause();
    await page.goto('https://kitchen.applitools.com/');
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    await expect(page).toHaveTitle(/.*Kitchen/);

    // Visual validation with screenshot
    await expect(page).toHaveScreenshot('the-kitchen.png'); 
    await page.pause();
    /*
    //ASSERTIONS
    //Validate if element is present or not present
    await expect(page.locator('text=The Kitchen')).toHaveCount(1);
    
    if(await page.$('text=The Kitchen')){
        await page.locator('text=The Kitchen').click();
    }

    //Validate if element is visible or hidden
    await expect(page.locator('text=The Kitchen')).toBeVisible();
    await expect.soft(page.locator('text=The Kitchen')).toBeHidden();

    //Validate if element is Enable or not enabled
    await expect(page.locator('text=The Kitchen')).toBeEnabled();
    await expect.soft(page.locator('text=The Kitchen')).toBeDisabled();
    
    await page.pause();

    //Validate if element is Enable or not enabled
    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    await expect(page.locator('text=The Kitchen')).not.toHaveText('123456789');
    await page.pause();
    
   //Validate element attribute
    await expect(page.locator('text=The Kitchen')).toHaveAttribute('class',/.*css-dpmy2a/);
    await expect(page.locator('text=The Kitchen')).toHaveClass(/.*css-dpmy2a/);
    await page.pause();
    */

})