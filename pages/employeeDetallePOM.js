const { expect } = require("@playwright/test");
//const fs = require('fs');
const path = require('path');

exports.employeeDetallePage=class employeeDetallePagePOM{

    constructor(page){
        this.page = page;

        this.firstName_textbox = page.getByRole('textbox', { name: 'First Name' });
        this.middleName_textbox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName_textbox = page.getByRole('textbox', { name: 'Last Name' });
        //this.nickname_textbox = page.getByRole('textbox', { name: 'Nickname' });
        //this.nickname_textbox = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[1]/div[2]/div/div/div[2]/input');
        this.id_textbox = page.locator('.oxd-input-group').filter({has: page.getByText('Employee Id', { exact: true })}).locator('input');
        this.numLicencia_textbox = page.locator('.oxd-input-group').filter({has: page.getByText("Driver's License Number", { exact: true })}).locator('input');
        this.licenciaExpiracion_cal = page.locator('.oxd-icon.bi-calendar').first();
        this.nacionalidad_combobox = this.page.locator('.oxd-input-group').filter({has: this.page.getByText('Nationality', { exact: true })}).locator('.oxd-select-text');
        this.estadoCivil_combobox = this.page.locator('.oxd-input-group').filter({has: this.page.getByText('Marital Status', { exact: true })}).locator('.oxd-select-text');
        this.fechaNac_cal = page.locator('.oxd-icon.bi-calendar').last();
        this.genero_male = this.page.locator('label').filter({ hasText: /^Male$/ });
        this.genero_female = this.page.locator('label').filter({ hasText: /^Female$/ });
        this.guardar1_button = page.locator('button').filter({ hasText: 'Save' }).first();
        this.addFile_button =  page.locator('button').filter({ hasText: 'Add' });
        this.browse_button = page.locator('button').filter({ hasText: 'Browse' });
        this.file_input = page.locator('input[type="file"]').first();
        this.comment_textbox = page.getByRole('textbox', { name: 'Type comment here' });
        this.guardar3_button = page.getByRole('button', { name: 'Save' }).nth(2);
        this.file_checkbox = page.locator('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon');
        //this.editar_button = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
        this.editar_Mobile_button = page.getByRole('button').filter({ hasText: /^$/ }).nth(1);
        this.guardar4_button = page.getByRole('button', { name: 'Save' }).nth(3);
    }
    
    // Validar los datos del empleado
    async validarDatosEmpleado(employeeDetalleData) {
        console.log("En validarDatosEmpleado");
        // Validar que los datos del empleado coincidan con los datos del archivo JSON
        await expect(this.firstName_textbox).toHaveValue(employeeDetalleData.primerNombre);
        await expect(this.middleName_textbox).toHaveValue(employeeDetalleData.medioNombre);
        await expect(this.lastName_textbox).toHaveValue(employeeDetalleData.apellido);
        /*if(await this.nickname_textbox.isVisible()){
            await this.nickname_textbox.fill(employeeDetalleData.nickname);
        }*/
        console.log("id guardado: " + employeeDetalleData.id + " id esperado: " + await this.id_textbox.inputValue());
        await expect(this.id_textbox).toHaveValue(employeeDetalleData.id);
    }

    async completarDetallesPersonales(employeeDetalleData) {
        console.log("En completarDetallesPersonales");
        //Completar los detalles personales del empleado a partir del archivo json
        await this.numLicencia_textbox.click();
        await this.numLicencia_textbox.fill(employeeDetalleData.numLicencia);
        await this.licenciaExpiracion_cal.click();
        const calendario = this.page.locator('.oxd-date-input-calendar').first();
        await calendario.locator('.oxd-calendar-selector-year').click();
        await calendario.getByRole('menu').getByText(String(employeeDetalleData.anio_cal), { exact: true }).click();
        await calendario.locator('.oxd-calendar-selector-month').click();
        await calendario.getByText(employeeDetalleData.mes_cal,{ exact: true }).click();
        await calendario.getByText(String(employeeDetalleData.dia_cal),{ exact: true }).click();
        await this.nacionalidad_combobox.click();
        await this.page.getByRole('option', {name: employeeDetalleData.nacionalidad}).click();
        await this.estadoCivil_combobox.click();
        await this.page.getByRole('option', {name: employeeDetalleData.estadoCivil}).click();
        await this.fechaNac_cal.click();

        // El calendario de nacimiento es el segundo calendario de fecha
        const calendarioNac = this.page.locator('.oxd-date-input-calendar').last();

        // Seleccionar año
        await calendarioNac.locator('.oxd-calendar-selector-year').click();
        await calendarioNac.getByText(String(employeeDetalleData.anio_Nac),{ exact: true }).click();

        // Seleccionar mes
        await calendarioNac.locator('.oxd-calendar-selector-month').click();
        await calendarioNac.getByText(employeeDetalleData.mes_Nac, { exact: true }).click();

        // Seleccionar día
        await calendarioNac.locator('.oxd-calendar-date').filter({hasText: new RegExp(`^${employeeDetalleData.dia_Nac}$`)}).click();

        if (employeeDetalleData.sexo === 'Male') {
            await this.genero_male.click();
        } else if (employeeDetalleData.sexo === 'Female') {
            await this.genero_female.click();
        } else {
            throw new Error(`Sexo no válido: ${employeeDetalleData.sexo}`);
        }
    }

    async guardarDatosPersonales() {
        console.log("En guardarDatosPersonales");
        //Guardar los detalles personales del empleado
        await expect(this.guardar1_button).toBeVisible();
        await this.guardar1_button.click();
    }

    async completarDatosAdjuntos(employeeDetalleData) {
        console.log("En completarDetallesPersonales");
        //Completar los datos adjuntos del empleado a partir del archivo json y del archivo adjunto
        await this.addFile_button.click();
        await expect(this.file_input).toBeAttached();
        
        const rutaArchivo = path.resolve(__dirname,'..','data','archivos',employeeDetalleData.file1);
        //console.log('Ruta del PDF:', rutaArchivo);
        await this.file_input.setInputFiles(rutaArchivo);

        await this.comment_textbox.click();
        await this.comment_textbox.fill(employeeDetalleData.comment);
        //await this.page.pause();
    }

    async guardarDatosAdjuntos() {
        console.log("En guardarDatosAdjuntos");
        //Guardar los datos adjuntos del empleado
        await this.guardar3_button.click();
    }

    async editarDatosAdjuntos(employeeDetalleData, isMobile) {
        console.log("En editarDatosAdjuntos");
        //Editar los datos adjuntos del empleado a partir del archivo json y del archivo adjunto
        const nombreArchivo = employeeDetalleData.file1;

        // Esperar a que aparezca el nombre del archivo guardado
        const archivoEnTabla = this.page.getByText(nombreArchivo, {exact: true});

        await expect(archivoEnTabla).toBeVisible({ timeout: 15000 });

        // Buscar la fila que contiene ese archivo
        const filaArchivo = this.page.getByRole('row').filter({has: archivoEnTabla});

        await expect(filaArchivo).toBeVisible({ timeout: 15000 });

        //console.log('Archivo esperado:', nombreArchivo);
        //console.log('Filas encontradas:', await filaArchivo.count());
        //console.log('¿Aparece el nombre del archivo?', await this.page.getByText(employeeDetalleData.file1, { exact: true }).count());
        //console.log('Texto de la página:', (await this.page.locator('body').innerText()).includes('imprimir.pdf'));

        if(!isMobile){
            const fileCheckbox = filaArchivo.getByRole('checkbox');
            if (!(await fileCheckbox.isChecked())) {
                await filaArchivo.locator('label').first().click();}

            await expect(fileCheckbox).toBeChecked();
            await filaArchivo.locator('button:has(.bi-pencil-fill)').click();
        }
        else{
            await this.editar_Mobile_button.click();
        }
        //console.log("archivo: "+employeeDetalleData.file2);
        const rutaArchivo2 = path.resolve(__dirname,'..','data','archivos',employeeDetalleData.file2);
        //console.log('Ruta del PDF:', rutaArchivo2);
        await this.file_input.setInputFiles(rutaArchivo2);

    }

    async guardarDatosEditados() {
        console.log("En guardarDatosEditados");
        //console.log('Cantidad de botones Save:', await this.page.getByRole('button', { name: 'Save', exact: true }).count());
        //Guardar los datos editados del empleado
        const botonesSave = this.page.getByRole('button', {name: 'Save', exact: true});

        //console.log('Cantidad de botones Save:', await botonesSave.count());

        /*for (let i = 0; i < await botonesSave.count(); i++) {
            console.log(
                `Botón ${i}: visible =`,
                await botonesSave.nth(i).isVisible(),
                'habilitado =',
                await botonesSave.nth(i).isEnabled()
            );
        }*/

        await this.guardar3_button.scrollIntoViewIfNeeded();
        await this.guardar3_button.click();
        //await this.page.pause();
    }

}