const express = require('express');
const publication2 = require('./publication2.js');
const router = express.Router();

router.get('/parse', async (req, res) => {
  const { query } = req;
  const researcherName= query.name+" "+query.surname;
  const searchQuery = query.value;

  if (!searchQuery) {
    return res.status(400).send('Missing search query parameter "value"');
  }

  try {
    const profileLink = await publication2.parseLinkToProfile(searchQuery);
    if (profileLink) {
      const publications = await publication2.parsePublications(profileLink);
      console.log('Data parsed from Google Scholar by PublicationRoute2');
      res.render('publications', {
        researcherName: researcherName,
        publications: publications
      });
    } else {
      res.status(404).send('No publication found');
    }
  } catch (error) {
    res.status(500).send('Error occurred in PublicationRoute2 while parsing the page ');
  }
});

module.exports = router;
