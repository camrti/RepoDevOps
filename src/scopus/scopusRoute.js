const express = require('express');
const router = express.Router();
const scopus = require('./scopus.js');

router.get('/scopus', async (req, res)=>{
    const name = req.query.name;
    const surname = req.query.surname;
    const affiliation = req.query.ateneo; 

    if (!name || !surname || !affiliation) {
        return res.status(400).send('Missing a query parameter');
    }

    try{
        const authID = await scopus.getAuthorId(name, surname, affiliation);
        const data = await scopus.getAuthorDetails(authID);
        res.json(data);
        console.log(data);
        console.log('Data from Scopus by ScopusRoute');
    }catch (err){
        console.error(err);
        res.status(500).send('Error occurred in ScopusRoute while requesting the data');
    }
})

module.exports = router;