const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    sendfileupload,
    creatfileupload
} =require('../contrulers/fileuploadcontruler')


router.get('/send', sendfileupload);
router.post('/creat',creatfileupload);
module.exports = router;
//module 