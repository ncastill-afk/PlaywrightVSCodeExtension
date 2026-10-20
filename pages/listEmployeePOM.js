const { expect } = require("@playwright/test");

exports.listEmployeePage=class listEmployeePagePOM{

    constructor(page){
        this.page = page;
        this.menu_button = this.page.locator('.oxd-topbar-header-hamburger');
        this.pim_link = this.page.locator('.oxd-main-menu-item:has-text("PIM")');
        this.listEmployee_link = this.page.getByRole('link', { name: 'Employee List' });
        this.add_link = this.page.getByRole('button', { name: 'Add' });
        this.filtros_toggle = this.page.locator('button.oxd-icon-button:has(.bi-caret-down-fill)');
        this.idEmployee_textbox = this.page.locator('.oxd-input-group').filter({has: this.page.getByText('Employee Id', { exact: true })}).locator('input');
        this.nameEmployee_textbox = this.page.locator('.oxd-input-group').filter({has: this.page.getByText('Employee Name', { exact: true })}).locator('input');
        this.searchButtton = this.page.getByRole('button', { name: 'Search' });
        this.registrosEncontrados = this.page.getByText(/Record Found|Records Found/);
        this.filaEmpleado = this.page.getByRole('row');
        this.tarjetaEmpleado = this.page.locator('.card-center');
    }

    async elegirMenuListEmployee(isMobile){
        console.log("En elegirMenuListEmployee");
        //Elegir el menú PIM y luego Employee List
        await this.page.waitForLoadState('networkidle');

        if (isMobile) {
            await this.menu_button.waitFor({ state: 'visible' });
            await this.menu_button.click();
            await this.pim_link.waitFor({ state: 'visible' });
            await this.pim_link.click();
            await this.page.waitForLoadState('domcontentloaded');
            //console.log('URL actual:', this.page.url());
            //console.log('Título de la página:', await this.page.title());
            //console.log('Texto visible:', (await this.page.locator('body').innerText()).slice(0, 2000));
            //await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible({ timeout: 15000 });
            //console.log('Título:', await this.page.title());
            //console.log('URL:', this.page.url());
            //console.log('Texto visible:', (await this.page.locator('body').innerText()).slice(0, 1500));
            //console.log('URL actual:', this.page.url());
            //console.log('Iconos caret-up:', await this.page.locator('.oxd-icon.bi-caret-up-fill').count());
            //console.log('Campos de texto:', await this.page.getByRole('textbox').count());
            //console.log('Enlace Employee List:', await this.page.getByRole('link', { name: 'Employee List' }).count());
            }
            else{
                await this.listEmployee_link.waitFor({ state: 'visible' });
                await expect(this.listEmployee_link).toBeVisible();
                await expect(this.listEmployee_link).toBeEnabled();
                await this.listEmployee_link.click();
                await expect(this.idEmployee_textbox).toBeVisible();
            }
            //console.log('URL actual:', this.page.url());
            //console.log('Título Employee List:', await this.page.getByRole('heading', {name: 'Employee Information'}).count());
            //console.log('Campos de texto visibles:', await this.page.locator('.oxd-input').count());
            //console.log('URL:', this.page.url());
            //console.log('Localizador Employee Id:', await this.idEmployee_textbox.count());
            //console.log('Inputs encontrados:', await this.page.locator('input').count());
            
        }

        async visibilizarCamposBusqueda(){
            console.log("En visibilizarCamposBusqueda");
            //Visibilizar los campos de búsqueda de la lista de empleados en la versión mobile
            const areaFiltros = this.page.locator('.oxd-table-filter-area');

            //console.log('Área de filtros visible:', await areaFiltros.isVisible());
            //console.log('Campo Employee Id visible:', await this.idEmployee_textbox.isVisible());
            //if (!(await areaFiltros.isVisible())) {
            if (!(await this.idEmployee_textbox.isVisible())) {
                await this.filtros_toggle.click();
            }

            await expect(areaFiltros).toBeVisible();
            await expect(this.idEmployee_textbox).toBeVisible();
        }

        async completarCamposBusqueda(employeeDetalleData){
            console.log("En completarCamposBusqueda");
            //Completar los campos de búsqueda de la lista de empleados a partir del archivo json
            await this.idEmployee_textbox.fill(employeeDetalleData.id);
            await this.nameEmployee_textbox.fill(employeeDetalleData.apellido);
        }

        async buscarResultados(){
            console.log("En buscarResultados");
            //Buscar los resultados de la lista de empleados
            //console.log('Botones Search encontrados:', await this.searchButtton.count());
            //console.log('Botón Search visible:', await this.searchButtton.isVisible());
            //console.log('Botón Search habilitado:', await this.searchButtton.isEnabled());
            await expect(this.searchButtton).toBeVisible();
            await expect(this.searchButtton).toBeEnabled();
            await this.searchButtton.click();
        }

        async seleccionarResultado(employeeDetalleData, isMobile){
            console.log("En seleccionarResultado");
            //Seleccionar el resultado de la lista de empleados y validar que se haya encontrado el empleado creado
            //console.log('URL:', this.page.url());
            //console.log('Texto visible en pantalla:', (await this.page.locator('body').innerText()).slice(0, 2500));
            //console.log('Coincidencias de registros encontrados:', await this.registrosEncontrados.count());
            await expect(this.registrosEncontrados).toHaveText('(1) Record Found');

            const fila = this.filaEmpleado.filter({hasText: String(employeeDetalleData.id)});
            const tarjeta = this.tarjetaEmpleado.filter({hasText: String(employeeDetalleData.id)});

            if (isMobile) {
                await tarjeta.locator('button:has(i.bi-pencil-fill)').click();
            }else{
                await fila.locator('button:has(i.bi-pencil-fill)').click();
            }
            await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**');
            const tituloPersonalDetails = this.page.getByRole('heading',{ name: 'Personal Details', exact: true });
            await expect(tituloPersonalDetails).toBeVisible();
        }
}