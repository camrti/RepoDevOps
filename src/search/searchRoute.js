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
    let data = [];
    let researchers;
    // Try to retrieve data from DB
    // data = search.getResearcherFromDB(researcherName)
    
    if (data.length === 0){
        researchers = await search.getResearchers(researcherName)
    }
    console.log(researchers,'DIO')
    res.status(200);
    res.render('search', {researchers});    
  } catch (error) {
      console.error('Error:', error);
      res.status(500);
  }
});

// Route to search researchers
router.get('/search_publications', async (req, res) => {
    const { researcherName } = req.query.name + ' ' + req.query.surname;
    const { searchQuery } = req.query.value;
    try {
    let data = [];
    let publications = [];
    // Try to retrieve data from DB
    // data = search.getPublicationFromDB(researcherName)
    
    if (data.length === 0){
        publications = search.getPublications(searchQuery)
    }
    res.status(200);
    res.render('publications',{ 
    researcherName: researcherName, 
    publications: publications
    });  

    } catch (error) {
        console.error('Error:', error);
        res.status(500);
    }
  });



module.exports = router;


