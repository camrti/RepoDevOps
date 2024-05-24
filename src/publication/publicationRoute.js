const express = require('express');
const publication = require('./publication.js');
const router = express.Router();

router.get('/parse', async (req, res) => {
  const researcherName = req.query.name;
  const researcherSurname = req.query.surname;
  const researcherAteneo = req.query.ateneo;  

  if (!researcherName || !researcherSurname || !researcherAteneo) {
    return res.status(400).send('Missing a query parameter');
  }

  try {
    const query = researcherAteneo + " " + researcherName + " " + researcherSurname;
    let profileLink = await publication.parseLinkToProfile(query);
    
    // Check if the profile link is not found, try to parse the profile link using the cleanAndExtractLastWord function
    if (!profileLink) {
      profileLink = await publication.parseLinkToProfile(publication.cleanAndExtractLastWord(researcherAteneo.toUpperCase()) + " " + researcherName + " " + researcherSurname);
    }

    // Check if the profile link is not found, try to parse the profile link using the translation map
    if (!profileLink) {
      profileLink = await publication.parseLinkToProfile(publication.translationMap.get(researcherAteneo.toUpperCase()) + " " + researcherName + " " + researcherSurname);
    }

    if (profileLink) {
      const { publications, hIndex, citations } = await publication.parsePublications(profileLink);
      console.log('Publications Data retrieved from parsePublications by PublicationRoute');
      res.json({
        researcherName: researcherName,
        hIndex : hIndex,
        citations: citations,
        publications: publications
      });
    } else {
      res.status(404).send('No publication found');
    }
  } catch (error) {
    res.status(500).send('Error occurred in PublicationRoute while parsing the page ');
  }
});

module.exports = router;