const { Router } = require("express");
const router = new Router();
// const multer = require('multer');
// const upload = multer({dest: './tmp'});
const { masivo, crear } = require("./coaching");


router.post('/coaching', crear)



module.exports = router; 