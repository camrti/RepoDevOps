const express = require('express');
const publication2 = require('./publication2.js');
const router = express.Router();

router.get('/parse', async (req, res) => {
  const { query } = req;
  const searchQuery = query.value;

  if (!searchQuery) {
    return res.status(400).send('Missing search query parameter "value"');
  }

  try {
    const profileLink = await publication2.parseLinkToProfile(searchQuery);
    if (profileLink) {
      const publications = await publication2.parsePublications(profileLink);
      res.json({ profileLink, publications });
    } else {
      res.status(404).send('No link found');
    }
  } catch (error) {
    res.status(500).send('Error occurred while parsing the page');
  }
});

module.exports = router;
