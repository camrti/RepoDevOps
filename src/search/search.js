// the client app must interact only with the search module, see the architecture diagram
const axios = require('axios');
const Researcher = require('../model/researcherModel');
const Publication = require('../model/publicationModel');

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


// Function to get the data from PublicationRoute
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


// Function to get the data from ScopusRoute
async function getScopusInfo(researcherAteneo, researcherSurname, researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://localhost:8003/scopus?ateneo=${encodeURIComponent(researcherAteneo)}&surname=${encodeURIComponent(researcherSurname)}&name=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Scopus Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}



// Function to get the resarcher data from DB
async function getResearcherFromDB(researcherName) {
  const researchers = await Researcher.find({
    $or: [
        { firstName: new RegExp(researcherName, 'i') },
        { lastName: new RegExp(researcherName, 'i') }
      ]
    });
    return researchers;
}

// // Function to get the publication data from Database
// async function getPublicationFromDB(researcherID){
//     const publications = await Researcher.findById(researcherID).populate('publications').select('publications');
//     return publications;
// }

// Function to write the publication data from Database
async function writeResearcherToDB(researchers) {
  let results = [];

  for (const researcher of researchers) {
    try {
      let res = await Researcher.create(researcher);
      results.push(res);
    } catch (err) {
      console.log("Failed researcher to write to DB", err);
    }
  }

  return results;
}

// // DA FINIRE
// // Function to write the publication data from Database
// async function writePublicationToDB(researcherName){

// }


module.exports = {
  getResearchers,
  getPublications,
  getScopusInfo,
  getResearcherFromDB,
  writeResearcherToDB
}; 