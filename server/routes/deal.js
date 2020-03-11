const express = require('express');
const router = express.Router();
const Deal = require('../database/deals.model.js');

// All these routes are using a basepath of HOST/deals
// Retieve a deal
router.get('/:id', (req, res) => {
    const dealId = req.params.id;

    res.status(200).json({deal: dealId});
});

// Create a new deal
router.post('/create', (req, res) => {

    const resultsCallback = (dbRes) => {
    
        res.status(200).json({
            success: dbRes.warningCount === 0,
            data: {
                dealId: dbRes.insertId
            }
        });
    } 
    console.log("received the following new deal:");
    console.log(req.body);

    // TODO enter this deal into the DB
    const deal = new Deal({...req.body, resultsCallback});

    // insert this deal into the database
    deal.insert();


});

// TODO add delete DB functionality
router.delete('/:id', (req, res) => {
    console.log("received a deal delete request");
});

// TODO add put DB functionality
router.put('/:id', (req, res) => {
    console.log(`received a put request to update deal ${req.parmas.id}`);
    console.log(req.body);
});

// TODO add patch functionality
router.patch('/:id', (req, res) => {
    console.log(`receives a patch request to partially update deal ${req.params.id}`);
    console.log(req.body);
});


module.exports = router;