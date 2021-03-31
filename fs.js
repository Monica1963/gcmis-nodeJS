const fs = require('fs');
const XLSX = require("xlsx");
const moment = require('moment');
const PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var path = require('path');
const dotenv = require('dotenv');
const { now } = require('moment');

dotenv.config();

const allowedExExtension = ['vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'];



/**
 * Lee hoja de excel devolviendo un json
 * 
 */

const ExcelAJSON = (archivo, model='') => {
    try{
      const excel = XLSX.readFile(
        // "C:\\Users\\MONICA\\Desktop\\datos.xlsx"
       // './N2APP.xlsx', {N2app}
       archivo, model
      );
      const nombreHoja = excel.SheetNames; // regresa un array
      let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    
      const jDatos = [];
      for (let i = 0; i < datos.length; i++) {
        const dato = datos[i];
        

        jDatos.push(dato);
    }
    //console.log(jDatos.length, nombreHoja);  

    return jDatos;
    
    } catch (e){
    console.error(e.name, e.message);
    }
};

  

module.exports = {ExcelAJSON};