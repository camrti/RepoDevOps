// the client app must interact only with the search module, see the architecture diagram
const axios = require('axios');
const cheerio = require('cheerio');

// Function to get the data from ReseracherRoute
async function getResearchers(researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8001/search/researcher=${researcherName}`);
    const $ = cheerio.load(response.data);
    const researchers = [];
    $('li').each((i, element) => {
      const name = $(element).text();
      researchers.push(name);
    });
    console.log('Data retrieved from ResearcherRoute by SearchRoute');
    return researchers;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


// Function to get the data from PublicationRoute2
async function getPublications(researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8002/publication2/parse?name=${researcherName}`);
    console.log('Data retrieved from PublicationRoute2 by SearchRoute');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}



// Function to get the data from Database

