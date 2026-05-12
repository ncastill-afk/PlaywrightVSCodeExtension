const fs = require('fs');
const csv = require('csv-parser');

async function leerCSV(path) {

    const resultados = [];

    return new Promise((resolve, reject) => {

        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => resultados.push(data))
            .on('end', () => resolve(resultados))
            .on('error', reject);

    });
}

module.exports = { leerCSV };