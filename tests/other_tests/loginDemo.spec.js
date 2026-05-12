import {test, expect} from '@playwright/test';

test('Login Demo Test 1', async ({page}) => {
    await page.goto('https://demo.applitools.com/')
    await page.pause()
    await page.locator('input[placeholder="Enter your username"]').fill('Abel Olvera Martinez')
    await page.locator('input[placeholder="Enter your password"]').fill('Arquitecto QA SDET')

    await page.waitForSelector('text=Sign in', {timeout: 4000})
    await expect(page.locator('text=Sign in')).toHaveCount(1)

    await page.locator('#log-in').click()
    await page.waitForSelector('text=ACME', {timeout: 4000})
    await expect(page.locator('text=ACME')).toHaveCount(1)

    await page.pause()
    await page.locator('text=ACME').isVisible()
    await page.pause()
})

test.only('Login Demo Test 2', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.pause();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('Leroy Bencini').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    //await page.pause();
})
//Pagina discontinuada
test('Login Demo Test 3', async ({page}) => {
    await page.pause();
    await page.goto('https://admin-demo.nopcommerce.com');
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Email:' }).press('ControlOrMeta+x');
    await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
    await page.getByRole('textbox', { name: 'Email:' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password:' }).click();
    await page.getByRole('textbox', { name: 'Password:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
    await page.getByRole('checkbox', { name: 'Remember me?' }).check();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.pause();
    await page.close();

  });
  