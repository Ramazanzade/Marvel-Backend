const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    sendfileupload,
    creatfileupload
} =require('../contrulers/fileuploadcontruler')

const fileexlimiter = require("../../Middlewares/fileextlimiter")
const filePayload =require('../../Middlewares/filePayload')
const fileSizeLimit =require('../../Middlewares/fileSizeLimit')

router.get('/send', sendfileupload);
router.post('/creat',creatfileupload,filePayload,fileSizeLimit,fileexlimiter(['.png','.jpg','.jpeg']) );
module.exports = router;
//module 