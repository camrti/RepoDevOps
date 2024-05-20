const express = require('express');
const router = express.Router();
router.use(express.json());
const publication = require('./scopus.js');

router
    .get('/researcher=:name', async (req, res)=>{
        try{
            let researcher = req.params.name;
            const [name, lastName] = researcher.split('_');
            let data = await publication.getScopusData(name, lastName);
            res.send(data);
            console.log('Name from Scopus by PublicationRoute');
        }catch (err){
            console.error(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    })
    .get('/researcherId=:id', async (req, res)=>{
        try{
            let researcherId = req.params.id;
            let data = await publication.getPublication(researcherId);
            res.send(data);
            console.log('ID from Scopus by PublicationRoute');
        }catch (err){
            console.error(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    });

    module.exports = router;