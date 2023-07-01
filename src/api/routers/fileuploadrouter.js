const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    filesget,
    fileadd,
    filedelet,
    fileupdate,
    filesget2
}= require('../contrulers/fileuploadcontruler')

const fileexlimiter = require("../../Middlewares/fileextlimiter")
const filePayload =require('../../Middlewares/filePayload')
const FileSizeLimit=require('../../Middlewares/fileSizeLimit')

router.get('/', filesget);
router.get('/file/:filename', filesget2);
router.post('/file',fileadd );
router.delete('/file/:id',filedelet);
router.put('/file/:id',fileupdate)
module.exports = router;
