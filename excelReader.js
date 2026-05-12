import XLSX from 'xlsx';

export function leerExcel(filePath, hoja) {

    const workbook = XLSX.readFile(filePath);
    console.log(workbook.SheetNames);
    
    const worksheet = workbook.Sheets[hoja];

    return XLSX.utils.sheet_to_json(worksheet);
}