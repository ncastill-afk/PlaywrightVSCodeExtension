import {test, expect} from '@playwright/test';
import { loginPage } from '../../pages/loginPOM';

test('test', async ({page}) => {
    const login = new loginPage(page);
    await login.goToLoginPage();
    await login.login('student', 'Password123');
    await login.loginValidado();
    //await page.pause();
});