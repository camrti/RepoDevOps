// the client app must interact only with the search module, see the architecture diagram
const axios = require('axios');
const Cineca = require('../model/cinecaModel');
const Scholar = require('../model/scholarModel');
const Scopus = require('../model/scopusModel'); 

// Function to get the data from ReseracherRoute
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


// Function to get the data from PublicationRoute
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


// Function to get the data from ScopusRoute
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

// // Function to get the resarcher data from DB
// async function getByNameCinecaInfoFromDB(researcherName) {

//   let cinecaInfo = await Cineca.find({
//     $or: [
//         { firstName: new RegExp(researcherName, 'i') },
//         { lastName: new RegExp(researcherName, 'i') }
//       ]
//     });
//     return cinecaInfo;
// }

// Function to get the researcher data from DB with case-insensitive matching
async function getByNameCinecaInfoFromDB(researcherFirstName, researcherLastName) {
  let cinecaInfo = await Cineca.find({
    firstName: new RegExp(`^${researcherFirstName}$`, 'i'),
    lastName: new RegExp(`^${researcherLastName}$`, 'i')
  });
  return cinecaInfo;
}


// Function to get the resarcher data from DB
async function getByIDCinecaInfoFromDB(cinecaID) {
  const info = await Cineca.findById(cinecaID);
    return info;
}

// Function to get the resarcher data from DB
async function getByIDScholarInfoFromDB(scholarID) {
  const scholarInfo = await Scholar.findById(scholarID);
    return scholarInfo;
}

// Function to get the resarcher data from DB
async function getByIDScopusInfoFromDB(scopusID) {
  const scopusInfo = await Scopus.findById(scopusID);
    return scopusInfo;
}

// // Function to write the publication data from Database
// async function writeCinecaInfoToDB(cinecaInfo) {
//   let results = [];

//   for (const info of cinecaInfo) {
//     try {
//       let res = await Cineca.create(info);
//       results.push(res);
//     } catch (err) {
//       console.log("Failed researcher to write to DB", err);
//     }
//   }

//   return results;
// }
// Function to write the cineca info to DB
async function writeCinecaInfoToDB(cinecaInfo) {
  let results = [];

  for (const info of cinecaInfo) {
    try {
      // Check if the info already exists in the database
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

      // If the info does not exist, insert it
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

// Function to write the publication data from Database
async function writeScholarInfoToDB(cinecaID, scholarInfo) {
  let info = {};

  try {
    // Check if the info already exists in the database
    let existingInfo = await Scholar.findOne({
      citations: scholarInfo.citations,
      hIndex: scholarInfo.hIndex,
      publications: scholarInfo.publications,
    });

    // If the info does not exist, insert it
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

// Function to write the publication data from Database
async function writeScopusInfoToDB(cinecaID, scopusInfo) {
  let info = {};

  try {
    // Check if the info already exists in the database
    let existingInfo = await Scopus.findOne({
      name: scopusInfo.name,
      surname: scopusInfo.surname,
      uni_and_dep: scopusInfo.uni_and_dep,
      numberOfPublications: scopusInfo.numberOfPublications,
      authorId: scopusInfo.authorId,
    });

    // If the info does not exist, insert it
    if (!existingInfo) {
      console.log("Inserting new entry in DB");
      info = await Scholar.create(scopusInfo);
      await Cineca.findByIdAndUpdate(cinecaID, { scholarID: info._id }, { new: true });
    } else {
      info = existingInfo;
      console.log("Duplicate entry found, not inserting in DB");
    }
  } catch (err) {
    console.log("Failed to write researcher to DB", err);
  }

  return info;
    // scopusInfo = await Scopus.create(scopusInfo);
    // await Cineca.findByIdAndUpdate(cinecaID, { scopusID: scopusInfo._id }, { new: true });
    // return scopusInfo;
}

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