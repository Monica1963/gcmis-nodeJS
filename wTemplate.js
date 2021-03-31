const dotenv = require('dotenv');

dotenv.config();

const {ExcelAJSON} = require('./fs');
const { planti } = require('./plantilla');

const armaArchivo = (analistas, fechaTemplate) => {
  
  analistas.map((analista) => {  
  const OMjson = ExcelAJSON(process.env.OM);
  
  
   const unaOM = OMjson.find((OM) => OM.UsuarioOrigen === analista.User);
     
   const nombreCompleto= `${analista.Nombre} ${analista.Apellido} ` ;
   planti(unaOM, nombreCompleto, fechaTemplate);
   
})};

const wTemplate = (fechaTemplate) =>{
  try{
    
    
    const Ujson = ExcelAJSON(process.env.USERFILE);
    
    const analistas = Ujson.filter((us) => us.Perfil === 'A')  

    armaArchivo(analistas, fechaTemplate);

  } catch(e) {
    console.error(e.name, e.message );
  }
       
 };

module.exports = {wTemplate};