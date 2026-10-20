import {test, expect} from '@playwright/test';
import { loginOrangePage } from '../../pages/loginOrangePOM.js';
//const { employeeData } = require('../../data/employeeData.js');
const employeeData = require('../../data/employeeData.json');
const employeeDetalleData = require('../../data/employeeDetalleData.json');
import { employeePage } from '../../pages/employeePOM.js';
import { employeeDetallePage } from '../../pages/employeeDetallePOM.js';
import { listEmployeePage } from '../../pages/listEmployeePOM.js';
const fs = require('fs');

test('Orange Site', async ({page}, testInfo) => {

    // Crear las instancias de las páginas
    const login = new loginOrangePage(page);
    const employee = new employeePage(page);
    const employeeDetalle = new employeeDetallePage(page);
    const listEmployee = new listEmployeePage(page);
    const isMobile = testInfo.project.name.includes('Mobile');

    // Iniciar sesión con las credenciales de administrador
    await login.goToLoginPage();
    await login.doLogin('Admin', 'admin123');
    //await page.pause();
    await login.loginValidado();
    
    //Elegir el Menú para agregar un empleado
    await employee.elegirMenuAddEmployee(isMobile);

    // Crear un nuevo empleado
    const id_employee = await employee.completarDatosEmployee(employeeData.usuario1);
    await employee.guardarEmployee();

    //Leer el id del empleado creado y guardarlo en los archivos JSON
    console.log("id devuelto: "+id_employee);
    employeeData.usuario1.id = id_employee;
    console.log("employeeData.usuario1.id: "+employeeData.usuario1.id);
    employeeDetalleData.usuario1.id = id_employee;
    //await page.pause();
      
    fs.writeFileSync(
        './data/employeeData.json',
        JSON.stringify(employeeData, null, 2)
    );
    //console.log("después de guardar id en employeeData: " + employeeData.usuario1.id);
    fs.writeFileSync(
        './data/employeeDetalleData.json',
        JSON.stringify(employeeDetalleData, null, 2)
    );
    //console.log("employeeData.usuario1: "+employeeData.usuario1); 
    //Validar que se haya creado el empleado y que se muestren los datos personales
    await employee.addEmployeeValidado();

    //Validar los datos del empleado creado y completar los detalles personales y adjuntos
    await employeeDetalle.validarDatosEmpleado(employeeDetalleData.usuario1);
    await employeeDetalle.completarDetallesPersonales(employeeDetalleData.usuario1);
    await employeeDetalle.guardarDatosPersonales();
    await employeeDetalle.completarDatosAdjuntos(employeeDetalleData.usuario1);
    await employeeDetalle.guardarDatosAdjuntos();

    //Editar los datos adjuntos del empleado creado y validar que se haya editado correctamente
    await employeeDetalle.editarDatosAdjuntos(employeeDetalleData.usuario1, isMobile);
    await employeeDetalle.guardarDatosEditados();

    //await expect(page.getByText(employeeDetalleData.usuario1.file1, { exact: true })).toBeVisible();
    //await page.pause();

    //Buscar el empleado creado en la lista de empleados y validar que se haya encontrado
    await listEmployee.elegirMenuListEmployee(isMobile);
    if (isMobile) {
        await listEmployee.visibilizarCamposBusqueda();
    }
    await listEmployee.completarCamposBusqueda(employeeDetalleData.usuario1);
    await listEmployee.buscarResultados();
    await listEmployee.seleccionarResultado(employeeDetalleData.usuario1, isMobile);

    //Cerrar sesión
    await login.doLogout();
    
    //await page.pause();
});

test('Login con contraseña incorrecta', async ({ page }) => {
    const login = new loginOrangePage(page);

    await login.goToLoginPage();

    // Ingresar contraseña incorrecta
    await login.doLogin('Admin', 'passwordIncorrecto');

    // Validar que el sistema rechace el acceso
    await login.loginErrorValidado();

    // Verificar que no se ingrese al Dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).not.toBeVisible();
});