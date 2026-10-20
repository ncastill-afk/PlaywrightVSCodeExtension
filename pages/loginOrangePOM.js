const { expect } = require("@playwright/test");

exports.loginOrangePage=class loginOrangePagePOM{

    constructor(page){
        this.page = page;
        this.username_textbox = page.getByRole('textbox', { name: 'username' });
        this.password_textbox = page.getByRole('textbox', { name: 'password' });
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.salir_button = page.locator('.oxd-userdropdown-tab');
        this.logout_button = page.getByRole('menuitem', { name: 'Logout' });
        this.login_error = page.getByText('Invalid credentials');
    }
    
    async goToLoginPage(){
        console.log("En goToLoginPage");
        // Navegar a la página de login
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }   

    async doLogin(username, password){
        console.log("En doLogin");
        // Rellenar los campos de usuario y contraseña para ingresar al sistema
        await this.page.waitForLoadState('networkidle');
        //await this.username_textbox.click();
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click(); 
        
    }

    async loginValidado(){
        console.log("En loginValidado");
        // Validar que se haya ingresado al sistema y que se muestre el Dashboard
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');
    }

    async doLogout(){
        console.log("En doLogout");
        // Cerrar sesión del sistema
        await this.page.waitForLoadState('networkidle');
        await this.salir_button.waitFor({ state: 'visible', timeout: 15000});
        await expect(this.salir_button).toBeEnabled();
        await this.salir_button.click();
        // Esperar a que Logout esté visible
        await expect(this.logout_button).toBeVisible({timeout: 10000});

        await this.logout_button.click();
         // Comprobar que regresó a la página de login
        await expect(this.login_button).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible({ timeout: 15000 });
    }

    async loginErrorValidado() {
        console.log("En loginErrorValidado");
        // Validar que el sistema rechace el acceso y muestre un mensaje de error
        await expect(this.login_error).toBeVisible();
        await expect(this.login_error).toHaveText('Invalid credentials');
    }
}   