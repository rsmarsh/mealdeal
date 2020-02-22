const express = require('express');
const router = express.Router();


// Retieve a deal
router.get('/:id', (req, res) => {
    const dealId = req.params.id;

    res.status(200).json({deal: dealId});
});

// Create a new deal
router.post('/create', (req, res) => {

    console.log("reveiced the following new deal:");
    console.log(req.body);

    res.status(200).json({success: true});

})


module.exports = router;