//Scholar Route

const express = require('express');
const scholar = require('./scholar.js');
const router = express.Router();

/**
 * REQs: [R3] - [HLD3.5]
 *       [R4] - [HLD4.5]
 * 
 * Route to parse publications from a researcher's Google Scholar profile.
 *
 * @param {string} req.query.name - The name of the researcher.
 * @param {string} req.query.surname - The surname of the researcher.
 * @param {string} req.query.ateneo - The institution of the researcher.
 * @returns {void} Responds with parsed publication data or an error message.
 */
router.get('/parse', async (req, res) => {
  const researcherName = req.query.name;
  const researcherSurname = req.query.surname;
  const researcherAteneo = req.query.ateneo;  

  if (!researcherName || !researcherSurname || !researcherAteneo) {
    return res.status(400).send('Missing a query parameter');
  }

  try {
    const query = researcherAteneo + " " + researcherName + " " + researcherSurname;
    let profileLink = await scholar.parseLinkToProfile(query);
    
    // Check if the profile link is not found, try to parse the profile link using the cleanAndExtractLastWord function
    if (!profileLink) {
      profileLink = await scholar.parseLinkToProfile(scholar.cleanAndExtractLastWord(researcherAteneo.toUpperCase()) + " " + researcherName + " " + researcherSurname);
    }

    // Check if the profile link is not found, try to parse the profile link using the translation map
    if (!profileLink) {
      profileLink = await scholar.parseLinkToProfile(scholar.translationMap.get(researcherAteneo.toUpperCase()) + " " + researcherName + " " + researcherSurname);
    }

    if (profileLink) {
      const { publications, hIndex, citations } = await scholar.parsePublications(profileLink);
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

// Export Scholar Route
module.exports = router;