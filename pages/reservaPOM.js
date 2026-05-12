const { expect } = require("@playwright/test");

exports.reservaPage=class reservaPagePOM{

    constructor(page){
        this.page = page;
        this.nombre_textbox = this.page.locator('input[name="inputName"]');
        this.direccion_textbox = this.page.locator('input[name="address"]');
        this.ciudad_textbox = this.page.locator('input[name="city"]');
        this.estado_textbox = this.page.locator('input[name="state"]');
        this.codigoZip_textbox = this.page.locator('input[name="zipCode"]');
        this.tipoTarj_combobox = this.page.locator('select[name="cardType"]');
        this.numTarjCred_textbox = this.page.locator('input[name="creditCardNumber"]');
        this.mes_textbox = this.page.locator('input[name="creditCardMonth"]');
        this.anio_textbox = this.page.locator('input[name="creditCardYear"]');
        this.nombreTarj_textbox = this.page.locator('input[name="nameOnCard"]');
        this.reserva_button = this.page.getByRole('button', { name: 'Purchase Flight' });
    }

    async completarFormulario(datosReserva){
        await this.nombre_textbox.fill(datosReserva.nombre);
        await this.direccion_textbox.fill(datosReserva.direccion);
        await this.ciudad_textbox.fill(datosReserva.ciudad);
        await this.estado_textbox.fill(datosReserva.estado);
        await this.codigoZip_textbox.fill(String(datosReserva.codigoZip));
        await this.tipoTarj_combobox.selectOption(datosReserva.tipoTarj);
        await this.numTarjCred_textbox.fill(String(datosReserva.numTarjCred));
        await this.mes_textbox.fill(String(datosReserva.mes));
        await this.anio_textbox.fill(String(datosReserva.anio));
        await this.nombreTarj_textbox.fill(datosReserva.nombreTarj);
        await this.reserva_button.click();
        /*await this.nombre_textbox.fill(datosReserva.nombre);
        await this.direccion_textbox.fill(datosReserva.direccion);
        await this.ciudad_textbox.fill(datosReserva.ciudad);
        await this.estado_textbox.fill(datosReserva.estado);
        await this.codigoZip_textbox.fill(datosReserva.codigoZip);
        await this.tipoTarj_combobox.selectOption(datosReserva.tipoTarj);
        await this.numTarjCred_textbox.fill(datosReserva.numTarjCred);
        await this.mes_textbox.fill(datosReserva.mes);
        await this.anio_textbox.fill(datosReserva.anio);
        await this.nombreTarj_textbox.fill(datosReserva.nombreTarj);
        await this.page.pause();
        await this.reserva_button.click();*/
    }

    async confirmacionReserva(){
        await expect(this.page.locator('xpath=/html/body/div[2]/div/h1')).toHaveText('Thank you for your purchase today!');
        await this.page.pause();
    }
}   