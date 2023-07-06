const express = require('express');
const router = express.Router();
const {
    filesget,
    fileadd,
    filedelet,
    fileupdate,
    fileget2
}= require('../contrulers/Splasfilecontruler')

router.get('/splasfileget', filesget);
router.get('/splasfile/:filename', fileget2);
router.post('/splasfile',fileadd );
router.delete('/splasfile/:id',filedelet);
module.exports = router;
