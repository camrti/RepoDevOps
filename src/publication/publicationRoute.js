const express = require('express');
const publication = require('./publication.js');
const router = express.Router();

router.get('/parse', async (req, res) => {
  const { query } = req;
  const researcherName= query.name+" "+query.surname;
  const searchQuery = query.value;

  if (!searchQuery) {
    return res.status(400).send('Missing search query parameter "value"');
  }

  try {
    const profileLink = await publication.parseLinkToProfile(searchQuery);
    if (profileLink) {
      const publications = await publication.parsePublications(profileLink);
      console.log('Publications Data retrieved from parsePublications by PublicationRoute');
      res.json({
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
