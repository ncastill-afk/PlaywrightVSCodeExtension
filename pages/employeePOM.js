const { expect } = require("@playwright/test");

exports.employeePage=class employeePagePOM{

    constructor(page){
        this.page = page;
        this.menu_button = page.locator('.oxd-topbar-header-hamburger');
        //this.pim_link = page.getByRole('link', { name: 'PIM' });
        this.pim_link = page.locator('.oxd-main-menu-item:has-text("PIM")');
        this.addEmployee_link = page.getByRole('link', { name: 'Add Employee' });
        this.add_link = page.getByRole('button', { name: 'Add' });
        //this.addEmployee_link = page.locator('a[href*="addEmployee"]');
        this.firstName_textbox = page.getByRole('textbox', { name: 'First Name' });
        this.middleName_textbox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName_textbox = page.getByRole('textbox', { name: 'Last Name' });
        this.id_textbox = page.getByRole('textbox').nth(4);
        this.switch_input = page.locator('.oxd-switch-input');
        this.username_textbox = page.getByRole('textbox').nth(5);
        this.password1_textbox = page.locator('input[type="password"]').first();
        this.password2_textbox = page.locator('input[type="password"]').nth(1);     
        this.saveButtton = page.getByRole('button', { name: 'Save' });
    }
 
        /*getAddEmployeeLink(isMobile) {
            return isMobile
                ? this.page.getByRole('link', { name: 'Add' })
                : this.page.getByRole('link', { name: 'Add Employee' });
        }*/
        async addEmployee(employeeData, testInfo){
             const isMobile = testInfo.project.name.includes('Mobile');

            if (isMobile) {
                await this.menu_button.waitFor({ state: 'visible' });
                await this.menu_button.click();
            }
            await this.pim_link.waitFor({ state: 'visible' });
            await this.pim_link.click();
            //const addBtn = this.getAddEmployeeLink(isMobile);
            //await addBtn.click();

            if (isMobile) {
                console.log("count mobile:", await this.add_link.count());
                await this.add_link.waitFor({ state: 'visible' });
                await expect(this.add_link).toBeVisible();
                await expect(this.add_link).toBeEnabled();
                await this.add_link.click();

            }else{
                console.log("count desktop:", await this.addEmployee_link.count());
                await this.addEmployee_link.waitFor({ state: 'visible' });
                await expect(this.addEmployee_link).toBeVisible();
                await expect(this.addEmployee_link).toBeEnabled();
                await this.addEmployee_link.click();
            }   

            await this.firstName_textbox.click();
            await this.firstName_textbox.fill(employeeData.primerNombre);
            await this.middleName_textbox.fill(employeeData.medioNombre);
            await this.lastName_textbox.fill(employeeData.apellido);
            await this.id_textbox.inputValue();
            console.log("Id a guardar: " +await this.id_textbox.inputValue()) ;
            if(employeeData.switch === 'true'){
                await this.switch_input.click();
                await this.username_textbox.click();
                await this.username_textbox.fill(employeeData.username);
                await this.password1_textbox.click();
                await this.password1_textbox.fill(employeeData.password1);
                await this.password2_textbox.fill(employeeData.password2);
                expect(employeeData.password1).toBe(employeeData.password2);
            }
            await this.saveButtton.click();
            return await this.id_textbox.inputValue();
    }

        async addEmployeeValidado(){
            await this.page.waitForLoadState('networkidle');
            //await expect(this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/h6')).toHaveText('Personal Details');
            await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toHaveText('Personal Details');
    }
}