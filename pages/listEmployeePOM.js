const { expect } = require("@playwright/test");

exports.listEmployeePage=class listEmployeePagePOM{

    constructor(page){
        this.page = page;
        this.menu_button = page.locator('.oxd-topbar-header-hamburger');
        //this.pim_link = page.getByRole('link', { name: 'PIM' });
        this.pim_link = page.locator('.oxd-main-menu-item:has-text("PIM")');
        this.listEmployee_link = page.getByRole('link', { name: 'Employee List' });
        this.down_button = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[1]/div[2]/div[3]/button/i');
        //this.add_link = page.getByRole('button', { name: 'Add' });
        //this.addEmployee_link = page.locator('a[href*="addEmployee"]');
        //this.idEmployee_textbox = page.getByRole('textbox', { name: 'Employee Id' });
        //this.idEmployee_textbox = page.locator('input').filter({has: page.locator('xpath=ancestor::div[label[text()="Employee Id"]]')});
        this.idEmployee_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/input');
        //this.idEmployee_textbox = page.getByRole('textbox', { name: 'Type for hints...' });
        //this.nameEmployee_textbox = page.getByRole('textbox', { name: 'Employee Name' });
        //this.nameEmployee_textbox = page.locator('input').filter({has: page.locator('xpath=ancestor::div[label[text()="Employee Name"]]')});
        //this.nameEmployee_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div');
        this.nameEmployee_textbox = page.locator('input[placeholder="Type for hints..."]').first();
        //this.nameEmployee_textbox = page.getByRole('textbox').nth(2);
        this.searchButtton = page.getByRole('button', { name: 'Search' });
        this.registrosEncontrados = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span');
    }
 
        async consultaEmployee(employeeDetalleData, testInfo){
            console.log("en consultaEmployee");
            await this.page.waitForLoadState('networkidle');
             const isMobile = testInfo.project.name.includes('Mobile');

            if (isMobile) {
                await this.menu_button.waitFor({ state: 'visible' });
                await this.menu_button.click();
                await this.pim_link.waitFor({ state: 'visible' });
                await this.pim_link.click();
                await this.down_button.waitFor({ state: 'visible' });
                await this.down_button.click(); 
            }
            else{
                await this.listEmployee_link.waitFor({ state: 'visible' });
                await expect(this.listEmployee_link).toBeVisible();
                await expect(this.listEmployee_link).toBeEnabled();
                await this.listEmployee_link.click();
            }
            //const addBtn = this.getAddEmployeeLink(isMobile);
            //await addBtn.click();

            /*if (isMobile) {
                //console.log("count mobile:", await this.add_link.count());
                await this.add_link.waitFor({ state: 'visible' });
                await expect(this.add_link).toBeVisible();
                await expect(this.add_link).toBeEnabled();
                await this.add_link.click();

            }else{
                //console.log("count desktop:", await this.addEmployee_link.count());
            }*/
            
            await expect(this.idEmployee_textbox).toBeVisible();

            await this.idEmployee_textbox.click();
            await this.idEmployee_textbox.fill(employeeDetalleData.id);
            await this.nameEmployee_textbox.fill(employeeDetalleData.apellido);
            // esperar dropdown
            //await this.page.waitForSelector('.oxd-autocomplete-option');

            // seleccionar primera opción
            //await this.page.locator('.oxd-autocomplete-option').first().click();
            /*await this.lastName_textbox.fill(employeeData.apellido);
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
            }*/
            await this.searchButtton.click();

            expect(await this.registrosEncontrados.textContent()).toBe('(1) Record Found'); 
            //return await this.id_textbox.inputValue();
    }

}