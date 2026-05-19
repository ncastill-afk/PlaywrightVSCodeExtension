const { expect } = require("@playwright/test");

exports.loginOrangePage=class loginOrangePagePOM{

    constructor(page){
        this.page = page;
        this.username_textbox = page.getByRole('textbox', { name: 'username' });
        this.password_textbox = page.getByRole('textbox', { name: 'password' });
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.salir_button = page.locator('xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/i');
        this.logout_button = page.getByRole('menuitem', { name: 'Logout' });
    }
    
    async goToLoginPage(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }   

    async doLogin(username, password){
        await this.page.waitForLoadState('networkidle');
        await this.username_textbox.click();
        await this.username_textbox.fill(username);
        //await this.username_textbox.press('Tab');
        await this.password_textbox.fill(password);
        await this.login_button.click(); 
        
    }

    async loginValidado(){
        await this.page.waitForLoadState('networkidle');
        //await expect(this.page.locator('xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[1]/span/h6')).toHaveText('Dashboard');
        await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');
    }

    async doLogout(){
        await this.page.waitForLoadState('networkidle');
        await this.salir_button.click();
        await this.logout_button.click();
    }
}   