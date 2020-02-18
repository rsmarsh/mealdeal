const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const dealId = req.params.id;

    res.status(200).json({deal: dealId});
});

module.exports = router;