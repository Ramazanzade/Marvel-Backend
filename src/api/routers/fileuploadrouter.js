const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    filesget,
    fileadd,
    filedelet,
    fileupdate
}= require('../contrulers/fileuploadcontruler')

const fileexlimiter = require("../../Middlewares/fileextlimiter")
const filePayload =require('../../Middlewares/filePayload')
const FileSizeLimit=require('../../Middlewares/fileSizeLimit')

router.get('/files/:id', filesget);
router.post('/files',fileadd );
router.delete('/files/:id',filedelet);
router.put('/files/:id',fileupdate)
module.exports = router;
