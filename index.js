const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

// const multer = require('multer');
// const upload = multer({dest: __dirname + '/tmp'});
const dotenv = require('dotenv');

dotenv.config();

const {readMyFile, readbyline, ExcelAJSON, getDoc} = require('./fs');

const PORT = process.env.PORT || 8000;

const coaching = require('./coaching');
const rtcoach = require('./rtcoach');


app.use(compression());
// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));


app.use(express.static('./public'));


app.use('/', rtcoach );


app.get('*',function(req,res) {
    res.sendFile('C:/2021/Node/ejerciciosnode/gcmis/public/404.html');
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

