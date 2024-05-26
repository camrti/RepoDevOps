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
    let cinecaInfo = [];
    // Try to retrieve data from DB
    cinecaInfo = await search.getByNameCinecaInfoFromDB(researcherName);

    if (cinecaInfo.length === 0){
        cinecaInfo = await search.getCinecaInfo(researcherName);
        cinecaInfo = await search.writeCinecaInfoToDB(cinecaInfo);
        console.log('Cineca Data retrieved from CINECA API')  
    } else {
        console.log('Cineca Data retrieved from DB')    
    }

    res.status(200);
    res.render('search', {researchers: cinecaInfo});
    console.log('Researchers Data retrieved from getReserarchers by SearchRoute')    
  } catch (error) {
      console.error('Error:', error);
      res.status(500);
  }
});

// Route to search publication
router.get('/search_publications', async (req, res) => {
    const cinecaID = req.query.cinecaID;

    try {
    let cinecaInfo = {};
    let scholarInfo = {};
    let scopusInfo = {};
    // Get cineca data form DB
    cinecaInfo = await search.getByIDCinecaInfoFromDB(cinecaID);
    console.log("Researcher cineca info retrived from DB by ID");
    
    // Try to get scholar data from DB
    scholarInfo = await search.getByIDScholarInfoFromDB(cinecaInfo.scholarID);

    // If no data found, get scholar data from API
    if (!scholarInfo){
        scholarInfo = await search.getScholarInfo(cinecaInfo.university, cinecaInfo.lastName, cinecaInfo.firstName);
        scholarInfo = await search.writeScholarInfoToDB(cinecaID, scholarInfo);
        console.log("Researcher cineca info retrived from SCHOLAR API");
    } else {
        console.log("Researcher scholar info retrived from DB");
    }

    // If no publications found
    if (!scholarInfo.publications) {
        res.status(404).send('No publication found');
        return;
    }

    // Try to get scopus data from DB
    scopusInfo = await search.getByIDScopusInfoFromDB(cinecaInfo.scopusID);
    
    // If no data found, get scopus data from API
    if (!scopusInfo){
        scopusInfo = await search.getScopusInfo(cinecaInfo.university, cinecaInfo.lastName, cinecaInfo.firstName);
        scopusInfo = await search.writeScopusInfoToDB(cinecaID, scopusInfo);
        console.log("Researcher scopus info retrived from DB");
    } else {
        console.log("Researcher scopus info retrived from DB");
    }
    
    res.status(200);
    res.render('publications',{
      researcherName: cinecaInfo.firstName.charAt(0).toUpperCase() + cinecaInfo.firstName.slice(1).toLowerCase(), 
      researcherSurname: cinecaInfo.lastName.charAt(0).toUpperCase() + cinecaInfo.lastName.slice(1).toLowerCase(),
      uni_and_dep:  scopusInfo.uni_and_dep || (cinecaInfo.university + ', ' + cinecaInfo.faculty + ' ' + cinecaInfo.structure),
      researcherGrade: cinecaInfo.grade,
      researcherSSD: cinecaInfo.ssd,
      numberOfPublications: scopusInfo.numberOfPublications || "N/A",
      publications: scholarInfo.publications || "N/A",
      hIndex: scholarInfo.hIndex || "N/A",
      citations: scholarInfo.citations || "N/A"
    });
    console.log('Publication Data retrieved from getPublication by SearchRoute')      
    } catch (error) {
        console.error('Error:', error);
        res.status(500);
    }
  });

module.exports = router;


