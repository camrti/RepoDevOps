// the client app must interact only with the search module, see the architecture diagram
const axios = require('axios');
const cheerio = require('cheerio');

// Function to get the data from ReseracherRoute
async function getResearchers(researcherName) {
  try {
    // Get the data from Cineca
    console.log(researcherName);
    const response = await axios.get(`http://localhost:8001/search?researcherName=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from ResearcherRoute by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


// Function to get the data from PublicationRoute2
async function getPublications(searchQuery) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8002/parse?value=${encodeURIComponent(searchQuery)}`);
    console.log('Data retrieved from PublicationRoute2 by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}



// Function to get the data from Database
// getPublicationFromDB(researcherName) TO WRITE

module.exports = {
  getResearchers,
  getPublications
}; 