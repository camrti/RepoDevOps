// routes.js
const express = require('express');
const researcher = require('./researcher.js');
const router = express.Router();

// Pagina iniziale
router.get('/', (req, res) => {
  res.render('index'); // Render index
  res.status(200); 
});

// Route to search researchers
router.get('/search', async (req, res) => {
  const { researcherName } = req.query;
  try {
    // Obtain researchers data
    const researchers = await researcher.getCinecaData(researcherName);

    if (Object.keys(researchers).length === 0)
      res.status(404); 
    else 
      res.status(200);
    
    res.render('search', {researchers} );    
    console.log('Data from Cineca by ResearcherRoute');
    return;
  } catch (error) {
      console.error('Error:', error);
      res.status(500);
      res.render('error');
      return;
  }
});

module.exports = router;

