import {test, expect} from '@playwright/test';
import { loginOrangePage } from '../../pages/loginOrangePOM.js';
//const { employeeData } = require('../../data/employeeData.js');
const employeeData = require('../../data/employeeData.json');
const employeeDetalleData = require('../../data/employeeDetalleData.json');
import { employeePage } from '../../pages/employeePOM.js';
import { employeeDetallePage } from '../../pages/employeeDetallePOM.js';
const fs = require('fs');

test('Orange Site', async ({page}, testInfo) => {
    const login = new loginOrangePage(page);
    const employee = new employeePage(page);
    const employeeDetalle = new employeeDetallePage(page);
    const isMobile = testInfo.project.name.includes('Mobile');

    await login.goToLoginPage();
    await login.doLogin('Admin', 'admin123');
    await page.pause();
    await login.loginValidado();
    

    const id_employee = await employee.addEmployee(employeeData.usuario1, testInfo);
    console.log("id devuelto: "+id_employee);
    employeeData.usuario1.id = id_employee;
    console.log("employeeData.usuario1.id: "+employeeData.usuario1.id);
    employeeDetalleData.usuario1.id = id_employee;
    await page.pause();
      
    fs.writeFileSync(
        './data/employeeData.json',
        JSON.stringify(employeeData, null, 2)
    );
    console.log("después de guardar id en employeeData: " + employeeData.usuario1.id);
    fs.writeFileSync(
        './data/employeeDetalleData.json',
        JSON.stringify(employeeDetalleData, null, 2)
    );
    console.log("employeeData.usuario1: "+employeeData.usuario1); 
    await employee.addEmployeeValidado();

    await employeeDetalle.addEmployeeDetalle(employeeDetalleData.usuario1, testInfo);
    
    await page.pause();
});