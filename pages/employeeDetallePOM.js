const { expect } = require("@playwright/test");
const fs = require('fs');
const path = require('path');

exports.employeeDetallePage=class employeeDetallePagePOM{

    constructor(page){
        this.page = page;

        this.firstName_textbox = page.getByRole('textbox', { name: 'First Name' });
        this.middleName_textbox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName_textbox = page.getByRole('textbox', { name: 'Last Name' });
        //this.nickname_textbox = page.getByRole('textbox', { name: 'Nickname' });
        this.nickname_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div[2]/div/div/div[2]/input');
        this.id_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[1]/div[1]/div/div[2]/input');
        this.numLicencia_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[2]/div[2]/div[1]/div/div[2]/input');
        this.licenciaExpiracion_cal = page.locator('.oxd-icon.bi-calendar').first();
        this.nacionalidad_combobox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div[1]/div[1]/div/div[2]/div/div/div[1]');
        
        //this.nacionalidad_combobox = page.getByLabel('Nationality');
        //this.nacionalidad_combobox = page.locator('label:has-text("Nationality")').locator('..').locator('.oxd-select-wrapper');
        this.estadoCivil_combobox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div[1]/div[2]/div/div[2]/div/div/div[1]');
        //this.estadoCivil_combobox = page.getByLabel('Marital Status');
        //this.estadoCivil_combobox = page.locator('label:has-text("Marital Status")').locator('..').locator('.oxd-select-wrapper');
        this.fechaNac_cal = page.locator('div:nth-child(5) > div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon');
        this.sexo_radioBtn = page.locator('div:nth-child(2) > div:nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input');
        //this.guardar1_button =page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button');
        /*this.guardar1_button = page
            .locator('form')
            .filter({ has: page.getByText('Personal Details') })
            .getByRole('button', { name: 'Save' });*/
        //this.guardar1_button = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button', { name: 'Save' });    
        this.guardar1_button = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[4]/button');
        //this.addFile_button = page.getByRole('button', { name: ' Add' });
        this.addFile_button =  page.locator('button').filter({ hasText: 'Add' });
        //this.browse_button = page.locator('button').filter({ hasText: 'Browse' });
        this.browse_button = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[3]/div/form/div[1]/div/div/div/div[2]/div/div[1]');
        
        this.file_input = page.locator('input[type="file"]').first();
        this.comment_textbox = page.getByRole('textbox', { name: 'Type comment here' });
        this.file_name_cell = this.page.getByText('imprimir.pdf');
        //page.locator('div').filter({ hasText: /^Select File$/ }).click();
        //page.getByText('Browse').click();
        //page.getByRole('button', { name: 'Choose File' }).setInputFiles('imprimir.pdf');
        //page.getByRole('textbox', { name: 'Type comment here' }).click();
        //page.getByRole('textbox', { name: 'Type comment here' }).fill('imprimir adjunto');
        //this.guardar3_button = page.getByRole('button', { name: 'Save' }).nth(2);
        this.guardar3_button = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[3]/div/form/div[3]/button[2]');
        this.file_checkbox = page.locator('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon');
        this.editar_button = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
        this.editar_Mobile_button = page.getByRole('button').filter({ hasText: /^$/ }).nth(1);
        this.guardar4_button = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[3]/div/form/div[4]/button[2]');
        //page.getByText('No file selected').click();
        //page.getByRole('button', { name: 'Choose File' }).setInputFiles('imprimir2.pdf');

    }
    
        async addEmployeeDetalle(employeeDetalleData, testInfo){
            console.log("En addEmployeeDetalle");
            const isMobile = testInfo.project.name.includes('Mobile');
            await expect(this.firstName_textbox).toHaveValue(employeeDetalleData.primerNombre);
            await expect(this.middleName_textbox).toHaveValue(employeeDetalleData.medioNombre);
            await expect(this.lastName_textbox).toHaveValue(employeeDetalleData.apellido);
            if(await this.nickname_textbox.isVisible()){
                await this.nickname_textbox.fill(employeeDetalleData.nickname);
            }
            console.log("id guardado: " + employeeDetalleData.id + " id esperado: " + await this.id_textbox.inputValue());
            await expect(this.id_textbox).toHaveValue(employeeDetalleData.id);
            console.log("pasó los expects");
            await this.numLicencia_textbox.click();
            await this.numLicencia_textbox.fill(employeeDetalleData.numLicencia);
            console.log("antes del calendario");
            await this.licenciaExpiracion_cal.click();
            await this.page.getByText(employeeDetalleData.anio_cal, { exact: true }).click();
            await this.page.getByText(employeeDetalleData.mes_cal, { exact: true }).click();
            await this.page.getByText(employeeDetalleData.dia_cal, { exact: true }).click();
            console.log("despues del calendario");
            await this.nacionalidad_combobox.click();
            await this.page.getByRole('option', {name: employeeDetalleData.nacionalidad}).click();
            await this.estadoCivil_combobox.click();
            //await this.estadoCivil_combobox.selectOption(employeeDetalleData.estadoCivil);
            await this.page.getByRole('option', {name: employeeDetalleData.estadoCivil}).click();
            console.log("antes del calendario fecha de nacimiento");
            await this.fechaNac_cal.click();
            await this.page.locator('.oxd-calendar-selector-year').click();
            await this.page.getByText(employeeDetalleData.anio_Nac.toString(), { exact: true }).click();
            // 👇 abrir selector de mes
            await this.page.locator('.oxd-calendar-selector-month').click();
            // seleccionar mes
            await this.page.getByText(employeeDetalleData.mes_Nac, { exact: true }).click();
            // seleccionar día
            await this.page.getByText(employeeDetalleData.dia_Nac.toString(), { exact: true }).click();
            /*
            await this.page.getByText(employeeDetalleData.anio_Nac, { exact: true }).click();
            await this.page.getByText(employeeDetalleData.mes_Nac, { exact: true }).click();
            await this.page.getByText(employeeDetalleData.dia_Nac, { exact: true }).click();*/
            console.log("despues del calendario fecha de nacimiento");
            await this.sexo_radioBtn.click();
            await expect(this.guardar1_button).toBeVisible();
            await this.guardar1_button.click();
            await this.page.pause();

            //await this.addFile_button.click();
            console.log("antes de cargar el archivo");
            console.log("archivo: "+employeeDetalleData.file1);

            console.log("existe:", fs.existsSync(employeeDetalleData.file1));
            
            await this.addFile_button.click();
            await expect(this.file_input).toBeAttached();
            
            await this.file_input.setInputFiles(employeeDetalleData.file1, { timeout: 5000 });
            const files = await this.file_input.evaluate(el => el.files.length);
            console.log("files cargados:", files);
            console.log("despues de cargar el archivo");
            await this.comment_textbox.click();
            await this.comment_textbox.fill(employeeDetalleData.comment);
            await this.guardar3_button.click();
            await expect(this.file_name_cell).toBeVisible();
            if(!isMobile){
                await this.file_checkbox.click();
                await this.editar_button.click();
            }
            else{
                await this.editar_Mobile_button.click();
            }

            console.log("archivo: "+employeeDetalleData.file2);
            console.log("existe:", fs.existsSync(employeeDetalleData.file2));
            await this.file_input.setInputFiles(employeeDetalleData.file2);
            console.log("despues de cargar el archivo 2");
            await this.guardar4_button.click();
            await this.page.pause();
    }

}