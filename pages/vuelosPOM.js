const { expect } = require("@playwright/test");

exports.vuelosPage=class vuelosPagePOM{

    constructor(page){
        this.page = page;
        this.rows = page.locator('table tbody tr');
    }
    
    async elegirVueloMasBarato(){
        const count = await this.rows.count();

        let precioMasBajo = Number.MAX_VALUE;
        let indexMasBarato = 0;

        for (let i = 0; i < count; i++) {
            const row = this.rows.nth(i);

            // Columna de precio (en BlazeDemo es la 6)
            const precioTexto = await row.locator('td').nth(5).innerText();

            // Limpia el "$" y convierte a número
            const precio = parseFloat(precioTexto.replace('$', ''));

            if (precio < precioMasBajo) {
                precioMasBajo = precio;
                indexMasBarato = i;
            }
            console.log(`Fila ${i}: ${precio}`);
            //await this.page.pause();
        }

        console.log(`Vuelo más barato: $${precioMasBajo}`);

        // Click en el botón de esa fila
        await this.rows.nth(indexMasBarato).locator('input[type="submit"]').click();
    }

    async vueloElegido(){
        await expect(this.page.locator('xpath=/html/body/div[2]/h2')).toHaveText('Your flight from TLV to SFO has been reserved.');
        //await this.page.pause();
    }
}   