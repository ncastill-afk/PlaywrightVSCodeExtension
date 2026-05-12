const { expect } = require("@playwright/test");

exports.destinoPage=class destinoPagePOM{

    constructor(page){
        this.page = page;
        this.origen_combobox = this.page.locator('select[name="fromPort"]');
        this.destino_combobox = this.page.locator('select[name="toPort"]');
        this.buscar_button = this.page.getByRole('button', { name: 'Find Flights' });
    }
    
    async goToDestinoPage(){
        await this.page.goto('https://www.blazedemo.com/');
    }   

    async buscarDestino(origen, destino){
        await this.origen_combobox.selectOption({ label: origen });
        await this.destino_combobox.selectOption({ label: destino });
        await this.buscar_button.click();        
    }

    async vuelos(origen, destino){
        await expect(this.page.locator('xpath=/html/body/div[2]/h3')).toHaveText(`Flights from ${origen} to ${destino}:`);
        //await this.page.pause();
    }
}   