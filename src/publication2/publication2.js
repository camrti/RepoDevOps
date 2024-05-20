const axios = require('axios');
const cheerio = require('cheerio');

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
    
    console.log('Link parsed from Google Scholar by Publication2');
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
      const title = $(element).find('.gsc_a_at').text() || 'N/A';
      const authors = $(element).find('.gs_gray').first().text() || 'N/A';
      const paperType = $(element).find('.gs_gray').eq(1).text()|| 'N/A'; // LE ULTIME 4 LETTERE RIPETE L'ANNO DI PUBBLICAZIONE 
      const year = $(element).find('.gsc_a_y .gsc_a_h').text() || 'N/A';
      const citationCount = $(element).find('.gsc_a_c a').text() || '0';
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
    console.log('Publications parsed from Google Scholar by Publication2')
    return publications;
  } catch (error) {
    console.error('Error (parsePublications) fetching or parsing the page:', error);
    throw error;
  }
}

module.exports = {
  parseLinkToProfile,
  parsePublications
};