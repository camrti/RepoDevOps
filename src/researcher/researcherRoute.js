require('dotenv').config();
const express = require('express');
const researcher = require('./researcher.js');
const router = express.Router();

// Route to search researchers
router.get('/search', async (req, res) => {
  const { researcherName } = req.query;
  try {
    // Obtain researchers data
    const researchers = await researcher.getCinecaData(researcherName);

    if (researchers.length === 0)
      res.status(404); 
    else 
      res.status(200);
    
    res.json(researchers);    
    console.log('Data from getCinecaData by ResearcherRoute');
    return;
  } catch (error) {
      console.error('Error:', error);
      res.status(500);
      return;
  }
});

module.exports = router;


