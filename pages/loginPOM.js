const { expect } = require("@playwright/test");

exports.loginPage=class loginPagePOM{

    constructor(page){
        this.page = page;
        this.username_textbox = page.getByRole('textbox', { name: 'Username' });
        this.password_textbox = page.getByRole('textbox', { name: 'Password' });
        this.login_button = page.getByRole('button', { name: 'Submit' });
    }
    
    async goToLoginPage(){
        await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }   

    async login(username, password){
        await this.username_textbox.click();
        await this.username_textbox.fill(username);
        await this.username_textbox.press('Tab');
        await this.password_textbox.fill(password);
        await this.login_button.click();        
    }

    async loginValidado(){
        await expect(this.page.locator('#loop-container > div > article > div.post-header > h1')).toHaveText('Logged In Successfully');
    }
}   