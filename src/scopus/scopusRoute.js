// Scopus Route

const express = require('express');
const router = express.Router();
const scopus = require('./scopus.js');

/**
 * REQs: [R3] - [HLD3.6]
 *       [R4] - [HLD4.6]
 * 
 * Route to retrieve author details from the Scopus API.
 *
 * @param {string} req.query.name - The name of the author.
 * @param {string} req.query.surname - The surname of the author.
 * @param {string} req.query.affiliation - The affiliation of the author.
 * @returns {void} Responds with author details or an error message.
 */
router.get('/scopus', async (req, res)=>{
    const name = req.query.name;
    const surname = req.query.surname;
    const affiliation = req.query.affiliation; 
    if (!name || !surname || !affiliation) {
        return res.status(400).send('Missing a query parameter');
    }

    try{
        const authID = await scopus.getAuthorId(name, surname, affiliation);
        const data = await scopus.getAuthorDetails(authID);
        res.json(data);
        console.log('Data from Scopus by ScopusRoute');
    }catch (err){
        console.error(err);
        res.status(500).send('Error occurred in ScopusRoute while requesting the data');
    }
})

// Export Scopur Route
module.exports = router;