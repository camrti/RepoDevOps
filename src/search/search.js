// Search functions

const axios = require('axios');
const Cineca = require('../model/cinecaModel');
const Scholar = require('../model/scholarModel');
const Scopus = require('../model/scopusModel'); 
const validator = require('validator');

/**
 * REQs: [R2] - [HLD2.2]
 * 
 * Retrieves researcher data from the Cineca service based on the provided researcher name.
 *
 * @param {string} researcherName - The full name of the researcher.
 * @returns {Promise<Array>} A promise that resolves to an array of researcher data or an empty array if an error occurs.
 */
async function getCinecaInfo(researcherName) {
  try {
    // Get the data from Cineca
    const response = await axios.get(`http://cineca-service:8001/search?researcherName=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Cineca Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

/**
 * REQs: [R3] - [HLD3.5]
 *       [R4] - [HLD4.5]
 * 
 * Retrieves Scholar information from the Scholar service.
 *
 * @param {string} researcherAteneo - The researcher's institution.
 * @param {string} researcherSurname - The researcher's surname.
 * @param {string} researcherName - The researcher's name.
 * @returns {Promise<Object>} A promise that resolves to scholar information for the specified researcher or an empty object if an error occurs.
 */
async function getScholarInfo(researcherAteneo, researcherSurname, researcherName) {
  try {
    // Get the data from Scholar
    const response = await axios.get(`http://scholar-service:8002/parse?ateneo=${encodeURIComponent(researcherAteneo)}&surname=${encodeURIComponent(researcherSurname)}&name=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Scholar Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}

/**
 * REQs: [R3] - [HLD3.6]
 *       [R4] - [HLD4.6]
 * 
 * Retrieves Scopus information for a researcher from the Scopus service.
 *
 * @param {string} researcherAteneo - The researcher's institution.
 * @param {string} researcherSurname - The researcher's surname.
 * @param {string} researcherName - The researcher's name.
 * @returns {Promise<Object>} A promise that resolves to Scopus information for the specified researcher or an empty object if an error occurs.
 */
async function getScopusInfo(researcherAteneo, researcherSurname, researcherName) {
  try {
    // Get the data from Scopus
    const response = await axios.get(`http://scopus-service:8003/scopus?affiliation=${encodeURIComponent(researcherAteneo)}&surname=${encodeURIComponent(researcherSurname)}&name=${encodeURIComponent(researcherName)}`);
    console.log('Data retrieved from Scopus Service by Search');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}

/**
 * REQs: [R2] - [HLD2.1]
 * 
 * Retrieves researcher data from the database with case-insensitive matching of first and last names.
 *
 * @param {string} researcherFirstName - The first name of the researcher.
 * @param {string} researcherLastName - The last name of the researcher.
 * @returns {Promise<Array>} A promise that resolves to an array of researcher data objects matching the provided names.
 */
 async function getByNameCinecaInfoFromDB(researcherFirstName, researcherLastName) {
  const ignoreChars = ' \'';
  if (
    !validator.isAlpha(researcherFirstName,"it-IT", { ignore: ignoreChars }) || 
    !validator.isAlpha(researcherLastName,"it-IT", { ignore: ignoreChars })
  ) {
    throw new Error('Invalid input');
  }

  let cinecaInfo = await Cineca.find({
    firstName: new RegExp(`^${researcherFirstName}$`, 'i'),
    lastName: new RegExp(`^${researcherLastName}$`, 'i')
  });
  return cinecaInfo;
}
   

/**
 * REQs: [R3] - [HLD3.3]
 *       [R4] - [HLD4.3]
 * 
 * Retrieves Cineca data from the database by Cineca ID.
 *
 * @param {string} cinecaID - The Cineca ID of the researcher.
 * @returns {Promise<Object>} A promise that resolves to the researcher data object with the specified Cineca ID.
 */
async function getByIDCinecaInfoFromDB(cinecaID) {
  const info = await Cineca.findById(cinecaID);
    return info;
}

/**
 * REQs: [R3] - [HLD3.3, HLD3.4]
 *       [R4] - [HLD4.3, HLD4.4]
 * 
 * Retrieves Scholar data from the database by Scholar ID.
 *
 * @param {string} scholarID - The Scholar ID of the researcher.
 * @returns {Promise<Object>} A promise that resolves to the researcher data object with the specified Scholar ID.
 */
async function getByIDScholarInfoFromDB(scholarID) {
  const scholarInfo = await Scholar.findById(scholarID);
    return scholarInfo;
}

/**
 * REQs: [R3] - [HLD3.4]
 *       [R4] - [HLD4.4]
 * 
 * Retrieves Scopus data from the database by Scopus ID.
 *
 * @param {string} scopusID - The Scopus ID of the researcher.
 * @returns {Promise<Object>} A promise that resolves to the researcher data object with the specified Scopus ID.
 */
async function getByIDScopusInfoFromDB(scopusID) {
  const scopusInfo = await Scopus.findById(scopusID);
    return scopusInfo;
}

/**
 * REQs: [R2] - [HLD2.3]
 * 
 * Writes Cineca researcher information to the database.
 *
 * @param {Array} cinecaInfo - An array of Cineca researcher information objects.
 * @returns {Promise<Array>} A promise that resolves to an array of inserted or existing researcher data objects in the database.
 */
 async function writeCinecaInfoToDB(cinecaInfo) {
  let results = [];

  for (const info of cinecaInfo) {
    try {
      let existingInfo = await Cineca.findOne({
        university: info.university,
        lastName: info.lastName,
        firstName: info.firstName,
        faculty: info.faculty,
        grade: info.grade,
        gender: info.gender,
        sc: info.sc,
        otherUniversityService: info.otherUniversityService,
        ssd: info.ssd,
        structure: info.structure
      });

      if (!existingInfo) {
        let res = await Cineca.create(info);
        results.push(res);
      } else {
        results.push(existingInfo);
        console.log("Duplicate entry found, not inserting in DB");
      }
    } catch (err) {
      console.log("Failed to write researcher to DB", err);
    }
  }

  return results;
}

/**
 * REQs: [R3] - [HLD3.8]
 *       [R4] - [HLD4.8]
 * 
 * Writes scholar information to the database and links it to a Cineca researcher.
 *
 * @param {string} cinecaID - The Cineca ID of the researcher.
 * @param {Object} scholarInfo - The scholar information to write to the database.
 * @returns {Promise<Object>} A promise that resolves to the inserted or existing scholar data object in the database.
 */
async function writeScholarInfoToDB(cinecaID, scholarInfo) {
  let info = {};

  try {
    let existingInfo = await Scholar.findOne({
      citations: scholarInfo.citations,
      hIndex: scholarInfo.hIndex,
      publications: scholarInfo.publications,
    });

    if (!existingInfo) {
      console.log("Inserting new entry in DB");
      info = await Scholar.create(scholarInfo);
      await Cineca.findByIdAndUpdate(cinecaID, { scholarID: info._id }, { new: true });
    } else {
      info = existingInfo;
      console.log("Duplicate entry found, not inserting in DB");
    }
  } catch (err) {
    console.log("Failed to write researcher to DB", err);
  }

  return info;
}

/**
 * REQs: [R3] - [HLD3.8]
 *       [R4] - [HLD4.8]
 * 
 * Writes Scopus information to the database and links it to a Cineca researcher.
 *
 * @param {string} cinecaID - The Cineca ID of the researcher.
 * @param {Object} scopusInfo - The Scopus information to write to the database.
 * @returns {Promise<Object>} A promise that resolves to the inserted or existing Scopus data object in the database.
 */
async function writeScopusInfoToDB(cinecaID, scopusInfo) {
  let info = {};

  try {
    let existingInfo = await Scopus.findOne({
      name: scopusInfo.name,
      surname: scopusInfo.surname,
      uni_and_dep: scopusInfo.uni_and_dep,
      numberOfPublications: scopusInfo.numberOfPublications,
      authorId: scopusInfo.authorId,
    });

    if (!existingInfo) {
      console.log("Inserting new entry in DB");
      info = await Scopus.create(scopusInfo);
      await Cineca.findByIdAndUpdate(cinecaID, { scopusID: info._id }, { new: true });
    } else {
      info = existingInfo;
      console.log("Duplicate entry found, not inserting in DB");
    }
  } catch (err) {
    console.log("Failed to write researcher to DB", err);
  }

  return info;
}

// Export search functions
module.exports = {
  getCinecaInfo,
  getScholarInfo,
  getScopusInfo,
  getByNameCinecaInfoFromDB,
  getByIDCinecaInfoFromDB,
  writeCinecaInfoToDB,
  getByIDScholarInfoFromDB,
  getByIDScopusInfoFromDB,
  writeScopusInfoToDB,
  writeScholarInfoToDB
}; 