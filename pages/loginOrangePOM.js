const { expect } = require("@playwright/test");

exports.loginOrangePage=class loginOrangePagePOM{

    constructor(page){
        this.page = page;
        this.username_textbox = page.getByRole('textbox', { name: 'username' });
        this.password_textbox = page.getByRole('textbox', { name: 'password' });
        this.login_button = page.getByRole('button', { name: 'Login' });
    }
    
    async goToLoginPage(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }   

    async doLogin(username, password){
        await this.page.waitForLoadState('networkidle');
        await this.username_textbox.click();
        await this.username_textbox.fill(username);
        await this.username_textbox.press('Tab');
        await this.password_textbox.fill(password);
        await this.login_button.click(); 
        
    }

    async loginValidado(){
        await this.page.waitForLoadState('networkidle');
        //await expect(this.page.locator('xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[1]/span/h6')).toHaveText('Dashboard');
        await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');
    }
}   