require('dotenv').config();
const express = require('express');
const researcher = require('./researcher.js');
const router = express.Router();
const {query} = require('express-validator');


// Route to search researchers
router.get('/search',[
  query('researcherName')
], async (req, res) => {
  
  const { researcherName } = req.query;
  console.log('ResearcherRoute: ', researcherName);
  try {
    // Obtain researchers data
    const researchers = await researcher.getCinecaData(researcherName);

    if (researchers.length === 0)
      res.status(404).send('No researcher found');
    else {
      res.status(200);
      res.json(researchers);    
      console.log('Data from getCinecaData by ResearcherRoute');
    } 
  
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server error');
  }
});

module.exports = router;


