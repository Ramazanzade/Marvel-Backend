const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    filesget,
    fileadd,
    filedelet,
    fileupdate,
    fileget2
}= require('../contrulers/fileuploadcontruler')

const fileexlimiter = require("../../Middlewares/fileextlimiter")
const filePayload =require('../../Middlewares/filePayload')
const FileSizeLimit=require('../../Middlewares/fileSizeLimit')

router.get('/fileget', filesget);
router.get('/file/:filename', fileget2);
router.post('/file',fileadd );
router.delete('/file/:id',filedelet);
module.exports = router;
