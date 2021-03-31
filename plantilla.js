const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const moment = require('moment'); 
const dotenv = require('dotenv');

dotenv.config();
const fs = require('fs');
const {ExcelAJSON} = require('./fs');
const path = require('path');



const planti = (registro, analista, fechaTemplate) =>{   
    try {
        
        //Load the docx file as a binary
        const content = fs
                .readFileSync(path.resolve(__dirname, `${process.env.PLANTILLA}`), 'binary');
        
        const zip = new PizZip(content);
        
        let doc = new Docxtemplater(zip);
        
        
        const Ujson = ExcelAJSON(process.env.USERFILE);

        //filtro solo los lideres de coaching y selecciono uno al azar
        const lideres = Ujson.filter((us) => us.Perfil === 'L' || us.Perfil ==='AD');
        const lider = lideres[Math.floor(Math.random() * lideres.length-1) + 1];
        const unLider = `${lider.Nombre} ${lider.Apellido}`;
        
    
        const Mjson = ExcelAJSON(process.env.MOTIVOSFILE);
       
            //selecciono una fortaleza y una debilidad al azar
        const uno = Mjson[Math.floor(Math.random() * Mjson.length-1) + 1];
      
        if (registro){
            //analistas con OM en el mes del informe
            const fecha  =new Date((registro.FECHA - (25567 + 2)) * 86400 * 1000);
            registro = {...registro, 
                UsuarioOrigen: analista,
                FORTALEZA: uno.Fortaleza, 
                DEBILIDAD: uno.Debilidad,
                PLAN: "Se verificarán próximos casos para evaluar mejora",
                LIDER: unLider,
                FECHA: moment(fecha).format('DD/MM/YYYY')
            } 
            
        } else{
          //analistas sin OM en el mes del informe
            const [ anio, mes ] = fechaTemplate.split("-");
            const fecha = `20/${mes}/${anio}`;
            
          
            registro = {...registro, 
                UsuarioOrigen: analista,
                FORTALEZA: "Análisis, manejo de herramientas, gestión basada en wkas.", 
                DEBILIDAD: "N/A",
                PLAN: "N/A",
                LIDER: unLider,
                FECHA: fecha,
                TICKET: "",
                MENSAJE: "N/A",
            } 
            
        };
    
   
        doc.setData(registro);
         
  
      
        doc.render();
      
       
        const buf = doc.getZip()
                    .generate({type: 'nodebuffer'});

        // buf is a nodejs buffer, you can either wrie it to a file or do anything else with it.
        fs.writeFileSync(path.resolve(__dirname, `${process.env.REPOSITORIO}${analista}${fechaTemplate}.docx`), buf);

        } catch(error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            console.error(`LA PUCHA error ${error} `);
            
        }
};

module.exports = { planti };