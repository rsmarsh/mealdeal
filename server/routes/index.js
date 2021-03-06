const router = require('express').Router();

const dealApi = require('./deal.js');

// forward all deal related requests to the deal.js module
router.use('/deals', dealApi);

module.exports = router;

