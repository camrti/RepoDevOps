// the client app must interact only with the search module, see the architecture diagram
const axios = require('axios');
//const Researcher = require('../model/researcherModel');

// Function to get the data from ReseracherRoute
async function getResearchers(researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8001/search?researcherName=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Researcher Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


// Function to get the data from PublicationRoute2
async function getPublications(researcherAteneo, researcherSurname, researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8002/parse?ateneo=${encodeURIComponent(researcherAteneo)}&surname=${encodeURIComponent(researcherSurname)}&name=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Publication Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}
/*DA FINIRE
async function getResearcherFromDB(researcherName) {
  const researchers = await Researcher.find({
    $or: [
        { nome: new RegExp(researcherName, 'i') },
        { cognome: new RegExp(researcherName, 'i') }
      ]
    });
    return researchers;
}
*/
// Function to get the data from Database
// getPublicationFromDB(researcherName) TO WRITE

module.exports = {
  getResearchers,
  getPublications,
  //getResearcherFromDB
}; 