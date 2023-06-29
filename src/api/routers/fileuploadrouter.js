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

router.get('/file/:id', filesget);
router.post('/file',upload.array('files'),fileadd );
router.delete('/file/:id',filedelet);
router.put('/file/:id',fileupdate)
module.exports = router;
