// routes.js
const express = require('express');
const researcher = require('./researcher.js');
const router = express.Router();

// Pagina iniziale
router.get('/', (req, res) => {
  res.render('index'); // Render index
});

// Route to search researchers
router.post('/search', async (req, res) => {
  const { researcherName } = req.body;

  try {
    // Obtain researchers data
    const researchers = await researcher.getCinecaData(researcherName);

    res.render('search', { researchers });
  } catch (error) {
    console.error('Error:', error);
    res.render('error');
  }
});

module.exports = router;

