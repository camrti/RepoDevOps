require('dotenv').config();
const express = require('express');
const cineca = require('./cineca.js');
const router = express.Router();

// Route to search researchers
router.get('/search', async (req, res) => {
  
  const { researcherName } = req.query;
  console.log('CinecaRoute: ', researcherName);
  try {
    // Obtain researchers data
    const researchers = await cineca.getCinecaData(researcherName);

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


