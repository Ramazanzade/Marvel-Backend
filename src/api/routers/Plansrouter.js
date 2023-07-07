const router = require('express').Router();
const { Planscountreler } = require('../contrulers/Planscountreler');

router.post('/plans', Planscountreler.add)
router.get('/plans', Planscountreler.getAll)
router.get('/plans/:id', Planscountreler.update)
router.delete('/plans/:id', Planscountreler.delete)
router.put('/plans/:id', Planscountreler.put);

module.exports = router;