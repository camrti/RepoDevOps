const express = require('express');
const router = express.Router();
router.use(express.json());
const publicationLib = require('./publicationLib');

router
    .get('/researcher=:name', async (req, res)=>{
        try{
            let researcher = req.params.name;
            const [name, lastName] = researcher.split('_');
            let data = await publicationLib.getScopusData(name, lastName);
            res.send(data);
        }catch (err){
            console.log(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    })
    .get('/researcherId=:id', async (req, res)=>{
        try{
            let researcherId = req.params.id;
            let data = await publicationLib.getPublication(researcherId);
            res.send(data);
        }catch (err){
            console.log(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    });

    module.exports = router;