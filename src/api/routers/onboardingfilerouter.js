const express = require('express');
const router = express.Router();
const {
    filesget,
    fileadd,
    filedelet,
    fileupdate,
    fileget2
}= require('../contrulers/onboardingfilecontruler')

router.get('/onboardingfileget', filesget);
router.get('/onboardingfile/:filename', fileget2);
router.post('/onboardingfile',fileadd );
router.delete('/onboardingfile/:id',filedelet);
module.exports = router;
