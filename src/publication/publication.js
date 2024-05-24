const axios = require('axios');
const cheerio = require('cheerio');

// Create a map to store the Ateneo translation
const translationMap = new Map();

translationMap.set('NAPOLI', 'NAPLES');

const cleanText = (text) => {
  return text.replace(/[^\x00-\x7F]/g, '');
};

function cleanAndExtractLastWord(input) {
  // Remove all double quotes from the string
  const cleanedString = input.replace(/"/g, '');

  // Split the cleaned string into an array of words
  const words = cleanedString.split(/\s+/);

  // Return the last word
  return words[words.length - 1];
}

async function parseLinkToProfile(searchQuery) {
  try {
    // Construct the URL with the search query
    const url = `https://scholar.google.it/citations?hl=it&view_op=search_authors&mauthors=${encodeURIComponent(searchQuery)}&btnG=`;
    // Fetch the HTML of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Find the first occurrence of the h3 element with class "gs_ai_name"
    const h3Element = $('h3.gs_ai_name').first();

    // Get the href attribute of the a element within the h3
    const link = h3Element.find('a').attr('href');
    
    console.log('Link parsed from Google Scholar by Publication');
    // Return the link
    return link ? `https://scholar.google.it${link}` : null;
  } catch (error) {
    console.error('Error (parseLinkToProfile) fetching or parsing the page:', error);
    throw error;
  }
}

async function parsePublications(profileLink) {
  try {
    // Append the required string to sort by publication date
    const url = `${profileLink}&view_op=list_works&sortby=pubdate`;

    // Fetch the HTML of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
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

module.exports = {
  parseLinkToProfile,
  parsePublications,
  cleanAndExtractLastWord,
  translationMap
};