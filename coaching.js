
 const fs = require('fs');
 //const {ExcelAJSON} = require('./fs');
 const {wTemplate} = require('./wTemplate');
//  const {exFile} = require('./fs');

 const dotenv = require('dotenv');

dotenv.config();

//  let fileName = '';
 let fechaTemplate = '';
 
 

   const crear = async (req, res) => {
     try{

      fechaTemplate = req.body.mes;
       
      wTemplate(fechaTemplate);
     
      const files = fs.readdirSync(process.env.REPOSITORIO);
      let cont = 0;
         files.forEach(file => {
             cont ++;
         });
     
        
       res.status(201).json({ message: cont + " Planillas generadas exitosamente en " + process.env.REPOSITORIO });

     } catch (e){
       console.error(e);
       res.sendStatus(500);
     }


   };
 
 
 module.exports = { crear };