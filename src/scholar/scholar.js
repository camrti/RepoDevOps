// Scholar functions

const axios = require('axios');
const cheerio = require('cheerio');

// Create a map to store the Ateneo translations
const translationMap = new Map();
translationMap.set('NAPOLI', 'NAPLES');

/**
 * Cleans non-ASCII characters from a given text.
 *
 * @param {string} text - The text to clean.
 * @returns {string} The cleaned text with only ASCII characters.
 */
const cleanText = (text) => {
  return text.replace(/[^\x00-\x7F]/g, '');
};

/**
 * Cleans the input string by removing double quotes and extracts the last word.
 *
 * @param {string} input - The input string to clean and extract the last word from.
 * @returns {string} The last word extracted from the cleaned input string.
 */
function cleanAndExtractLastWord(input) {
  const cleanedString = input.replace(/"/g, '');

  const words = cleanedString.split(/\s+/);

  return words[words.length - 1];
}

/**
 * REQs: [R3] - [HLD3.5]
 *       [R4] - [HLD4.5]
 * 
 * Parses a link to a Google Scholar profile based on the provided search query.
 *
 * @param {string} searchQuery - The search query used to find the profile.
 * @returns {Promise<string|null>} A promise that resolves to the parsed profile link or null if no link is found.
 * @throws {Error} If there is an error fetching or parsing the page.
 */
async function parseLinkToProfile(searchQuery) {
  try {
    const url = `https://scholar.google.it/citations?hl=it&view_op=search_authors&mauthors=${encodeURIComponent(searchQuery)}&btnG=`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const h3Element = $('h3.gs_ai_name').first();
    const link = h3Element.find('a').attr('href');
    
    console.log('Link parsed from Google Scholar by Publication');

    return link ? `https://scholar.google.it${link}` : null;

  } catch (error) {
      console.error('Error (parseLinkToProfile) fetching or parsing the page:', error);
      throw error;
  }
}

/**
 * REQs: [R3] - [HLD3.5]
 *       [R4] - [HLD4.5]
 * 
 * Parses publications from a Google Scholar profile page.
 *
 * @param {string} profileLink - The link to the Google Scholar profile page.
 * @returns {Promise<{publications: Array, hIndex: string, citations: string}>} A promise that resolves to an object containing parsed publications, h-index, and citation count.
 * @throws {Error} If there is an error fetching or parsing the page.
 */
async function parsePublications(profileLink) {
  try {
    const url = `${profileLink}&view_op=list_works&sortby=pubdate`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const publications = [];

    // Parse the table rows in the publication list
    $('#gsc_a_b .gsc_a_tr').each((index, element) => {
      const title = cleanText($(element).find('.gsc_a_at').text() || 'N/A');
      const authors = cleanText($(element).find('.gs_gray').first().text() || 'N/A');
      const paperType = cleanText($(element).find('.gs_gray').eq(1).text() || 'N/A');
      const year = cleanText($(element).find('.gsc_a_y .gsc_a_h').text() || 'N/A');
      const citationCount = cleanText($(element).find('.gsc_a_c a').text() || '0');
      const publicationLink = $(element).find('.gsc_a_at').attr('href');
      const fullPublicationLink = publicationLink ? `https://scholar.google.it${publicationLink}` : 'N/A';
        
      publications.push({
        title,
        authors,
        paperType,
        year,
        citationCount,
        publicationLink: fullPublicationLink,
      });
    });

    const hIndex = $('#gsc_rsb_st tbody tr:contains("Indice H") td.gsc_rsb_std').first().text().trim() || 'N/A';
    const citations = $('#gsc_rsb_st tbody tr:contains("Citazioni") td.gsc_rsb_std').first().text().trim() || 'N/A';
    
    console.log('Publications parsed from Google Scholar by Publication')

    return { publications, hIndex, citations };
  } catch (error) {
    console.error('Error (parsePublications) fetching or parsing the page:', error);
    throw error;
  }
}

// Export Scholar functions
module.exports = {
  parseLinkToProfile,
  parsePublications,
  cleanAndExtractLastWord,
  translationMap
};