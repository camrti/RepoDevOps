// the client app must interact only with the search module, see the architecture diagram

require('dotenv').config();
const express = require('express');
const search = require('./search.js');
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200);
    res.render('index');
});

// Route to search researchers
router.get('/search_researchers', async (req, res) => {
  const { researcherName } = req.query;
  try {
    let researchers = [];
    // Try to retrieve data from DB
    //researchers = await search.getResearcherFromDB(researcherName);
    if (researchers.length === 0){
        researchers = await search.getResearchers(researcherName)
    }
    res.status(200);
    res.render('search', {researchers});
    console.log('Researchers Data retrieved from getReserarchers by SearchRoute')    
  } catch (error) {
      console.error('Error:', error);
      res.status(500);
  }
});

// Route to search publication
router.get('/search_publications', async (req, res) => {
    const researcherName = req.query.name;
    const researcherSurname = req.query.surname;
    const researcherAteneo = req.query.ateneo; 
    try {
    let data = [];
    // Try to retrieve data from DB
    // data = search.getPublicationFromDB(researcherName)
    
    if (data.length === 0){
        data = await search.getPublications(researcherAteneo, researcherSurname, researcherName)
    }

    // If no data found
    if (!data.publications) {
        res.status(404).send('No publication found');
        return;
    }

    res.status(200);
    res.render('publications',{ 
      researcherName: researcherName, 
      researcherSurname: researcherSurname,
      publications: data.publications
    });
    console.log('Publication Data retrieved from getPublication by SearchRoute')      
    } catch (error) {
        console.error('Error:', error);
        res.status(500);
    }
  });

module.exports = router;


