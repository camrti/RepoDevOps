// Search Service 

require('dotenv').config();

const DB = require('../database/connection')
const express = require('express');
const search = require('./search.js');
const router = express.Router();

const dbName = process.env.MONGO_DB || "researcherDB";
const dbUri = process.env.MONGO_URI || "mongodb://database-service:27017";

/**
 * Opens a connection to the specified database.
 */
DB.openConnection(dbName, dbUri);

/**
 * Route to render the index page.
 *
 * @returns {void} Responds with a rendered HTML page.
 */
router.get('/', async (req, res) => {
    res.status(200);
    res.render('index');
});

/**
 * REQs: [R2] - [HLD2.1, HLD2.2, HLD2.3, HLD2.4]
 *
 * Route to search researchers by their first and last names.
 * @param {string} req.query.researcherFirstName - The first name of the researcher.
 * @param {string} req.query.researcherLastName - The last name of the researcher.
 * @returns {void} Responds with a rendered HTML page displaying researcher information or an error message.
 */
router.get('/search_researchers', async (req, res) => {
    let { researcherFirstName, researcherLastName } = req.query;
    try {
        researcherFirstName = researcherFirstName.trim();
        researcherLastName = researcherLastName.trim();
    } catch (error){
        console.error('Error:', error);
        res.status(500);
    }
   
    try {
      let cinecaInfo = [];

      cinecaInfo = await search.getByNameCinecaInfoFromDB(researcherFirstName, researcherLastName);

      if (cinecaInfo.length === 0){
          const researcherFullName = researcherFirstName + ' ' + researcherLastName;
          cinecaInfo = await search.getCinecaInfo(researcherFullName);
          cinecaInfo = await search.writeCinecaInfoToDB(cinecaInfo);
          if (cinecaInfo.length === 0)
              console.log('No researcher found with CINECA API')  
          else 
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
        console.log("Researcher scopus info retrived from SCOPUS API");
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


