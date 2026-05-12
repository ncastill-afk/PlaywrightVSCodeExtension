import {test, expect} from '@playwright/test';
import { destinoPage } from '../../pages/destinoPOM';
import { vuelosPage } from '../../pages/vuelosPOM';
//const { reservaData } = require('../../data/reservaData');
import { reservaPage } from '../../pages/reservaPOM';
import { leerExcel } from '../../excelReader';
import path from 'path';

const reservas = leerExcel(path.join(process.cwd(), 'data', 'reservas.xlsx'),'Hoja2');
console.log(reservas);
for (const reservaData of reservas) {

    test(`Reserva de ${reservaData.nombre}`, async ({ page }) => {

        console.log(reservaData);

        console.log(reservaData.nombre);
        const destino = new destinoPage(page);
        const vuelos = new vuelosPage(page);
        const reserva = new reservaPage(page);

        await destino.goToDestinoPage();
        await destino.buscarDestino(reservaData.origen, reservaData.destino);
        await destino.vuelos(reservaData.origen, reservaData.destino);
        //await page.pause();

        await vuelos.elegirVueloMasBarato();
        await vuelos.vueloElegido();
        //await page.pause();

        //await reserva.completarFormulario(reservaData.usuario1);
        await reserva.completarFormulario(reservaData);
        await reserva.confirmacionReserva();
        await page.pause();
    });
}