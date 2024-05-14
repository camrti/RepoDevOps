const express = require('express');
const router = express.Router();
router.use(express.json());
const researcherLib = require('./researcherLib');

router
    .get('/researcher=:name', async (req, res)=>{
        try{
            let researcher = req.params.name;
            const [name, lastName] = researcher.split('_');
            let data = await researcherLib.getScopusData(name, lastName);
            res.send(data);
        }catch (err){
            console.log(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    });

    module.exports = router;