const { expect } = require("@playwright/test");

exports.employeePage=class employeePagePOM{

    constructor(page){
        this.page = page;
        this.menu_button = page.locator('.oxd-topbar-header-hamburger');
        this.pim_link = page.locator('.oxd-main-menu-item:has-text("PIM")');
        this.addEmployee_link = page.getByRole('link', { name: 'Add Employee' });
        this.add_link = page.getByRole('button', { name: 'Add' });
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

        async elegirMenuAddEmployee(isMobile){
            console.log("En elegirMenuAddEmployee");
            //Seleccionar el menú PIM y luego Add Employee
            if (isMobile) {
                await this.menu_button.waitFor({ state: 'visible' });
                await this.menu_button.click();
            }
            await this.pim_link.waitFor({ state: 'visible' });
            await this.pim_link.click();

            if (isMobile) {
                //console.log("count mobile:", await this.add_link.count());
                await this.add_link.waitFor({ state: 'visible' });
                await expect(this.add_link).toBeVisible();
                await expect(this.add_link).toBeEnabled();
                await this.add_link.click();

            }else{
                //console.log("count desktop:", await this.addEmployee_link.count());
                await this.addEmployee_link.waitFor({ state: 'visible' });
                await expect(this.addEmployee_link).toBeVisible();
                await expect(this.addEmployee_link).toBeEnabled();
                await this.addEmployee_link.click();
            }   

        }

        async completarDatosEmployee(employeeData){
            console.log("En completarDatosEmployee");
            //await this.firstName_textbox.click();
            //Completar los datos del empleado a partir del archivo json y devolver el id generado
            await this.firstName_textbox.fill(employeeData.primerNombre);
            await this.middleName_textbox.fill(employeeData.medioNombre);
            await this.lastName_textbox.fill(employeeData.apellido);
            await this.id_textbox.inputValue();
            console.log("Id a guardar: " +await this.id_textbox.inputValue()) ;
            if(employeeData.switch === 'true'){
                await this.switch_input.click();
                await this.username_textbox.click();
                // Generar un username único en cada ejecución
                const usernameUnico =`${employeeData.username}_${Date.now()}`;
                await this.username_textbox.fill(usernameUnico);
                //await this.username_textbox.fill(employeeData.username);
                await this.password1_textbox.click();
                await this.password1_textbox.fill(employeeData.password1);
                await this.password2_textbox.fill(employeeData.password2);
                expect(employeeData.password1).toBe(employeeData.password2);
            }
            return await this.id_textbox.inputValue();
        }
 
        async guardarEmployee(){
            console.log("En guardarEmployee");
            //Guardar el empleado creado
            await this.saveButtton.waitFor({ state: 'visible' });
            await expect(this.saveButtton).toBeEnabled();

            //console.log("Botones Save encontrados:", await this.saveButtton.count());

            await this.saveButtton.click();

            // Esperar brevemente para observar la respuesta de OrangeHRM
            await this.page.waitForTimeout(2000);

            //console.log("URL después de Save:", this.page.url());

            /*console.log(
                "Errores después de Save:",
                await this.page.locator('.oxd-input-field-error-message').allTextContents()
            );

            console.log(
                "Mensajes después de Save:",
                await this.page.locator('.oxd-toast-content-text').allTextContents()
            );*/
    }

        async addEmployeeValidado(){
            console.log("En addEmployeeValidado");
            //console.log("URL actual:", this.page.url());
            // Mostrar posibles errores de los campos
            //console.log("Errores de validación:", await this.page.locator('.oxd-input-field-error-message').allTextContents());
            // Mostrar mensajes de confirmación
            //console.log("Mensajes de confirmación:", await this.page.locator('.oxd-toast-content-text').allTextContents());
            // Mostrar los encabezados de la pantalla actual
            const encabezados = await this.page.locator('h6').allTextContents();
            //console.log("Encabezados actuales:", encabezados);
            //Validar que se haya creado el empleado y que se muestren los datos personales
            await this.page.waitForLoadState('networkidle');
            const personalDetails = this.page.getByRole('heading', {name: 'Personal Details', exact: true});

            // Esperar a que se muestre la pantalla de datos personales
            await expect(personalDetails).toBeVisible({timeout: 15000});
            //await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toHaveText('Personal Details');
    }
}