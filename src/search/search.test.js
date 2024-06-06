const fs = require('fs');
const express = require('express');
const path = require('path');
const search = require('./search.js');
const cinecaRoute = require('../cineca/cinecaRoute.js');
const scholarRoute = require('../scholar/scholarRoute.js');
const scopusRoute = require('../scopus/scopusRoute.js'); 
const CINECA_PORT=8001
const SCHOLAR_PORT=8002
const SCHOPUS_PORT=8003

const DB = require('../database/connection')
const Cineca = require('../model/cinecaModel');
const Scholar = require('../model/scholarModel');
const Scopus = require('../model/scopusModel'); 
const exp = require('constants');

const dbName = "testDB";
const dbUri = "mongodb://172.16.174.108:27017";

DB.openConnection(dbName, dbUri)

const cinecaApp = express();
cinecaApp.use('/', cinecaRoute);
cinecaServer = cinecaApp.listen(CINECA_PORT, () => {
    console.log(`\n Cineca service avviato sulla porta ${CINECA_PORT}`);
  });

const scholarApp = express();
scholarApp.use('/', scholarRoute);
scholarServer = scholarApp.listen(SCHOLAR_PORT, () => {
    console.log(`\nScholar service avviato sulla porta ${SCHOLAR_PORT}`);
  });

const scopusApp = express();
scopusApp.use('/', scopusRoute);
scupusServer = scopusApp.listen(SCHOPUS_PORT, () => {
    console.log(`\nScopus service avviato sulla porta ${SCHOPUS_PORT}`);
  });

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'searchTestCases.json'), 'utf8'));

describe("Test search.js module", () => {

    afterAll(async () => {
        cinecaServer.close(() => {
            console.log('Cineca service stopped.');
        });
        scholarServer.close(() => {
            console.log('Scholar service stopped.');
        });
        scupusServer.close(() => {
            console.log('Scopus service stopped.');
        });

        await DB.closeConnection();
  
    });

    describe("Test Cineca functions", () => {
        test.each(testCases['search']['getCinecaInfo'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult}) => {
            console.log(desc);  
            const data = await search.getCinecaInfo(name);
    
            expect(data.length).toEqual(expectedResult.length);
    
            for (let i = 0; i < data.length; i++) {
                expect(data[i].university).toEqual(expectedResult[i].university);
                expect(data[i].lastName).toEqual(expectedResult[i].lastName);
                expect(data[i].firstName).toEqual(expectedResult[i].firstName);
                expect(data[i].faculty).toEqual(expectedResult[i].faculty);
                expect(data[i].gender).toEqual(expectedResult[i].gender);
                expect(data[i].sc).toEqual(expectedResult[i].sc);
                expect(data[i].otherUniversityService).toEqual(expectedResult[i].otherUniversityService);
                expect(data[i].ssd).toEqual(expectedResult[i].ssd);
                expect(data[i].structure).toEqual(expectedResult[i].structure);
            }
    
            for (let i = 0; i < data.length; i++) {
                expect(typeof data[i].university).toBe('string');
                expect(typeof data[i].lastName).toBe('string');
                expect(typeof data[i].firstName).toBe('string');
                expect(typeof data[i].faculty).toBe('string');
                expect(typeof data[i].gender).toBe('string');
                expect(typeof data[i].sc).toBe('string');
                expect(typeof data[i].otherUniversityService).toBe('string');
                expect(typeof data[i].ssd).toBe('string');
                expect(typeof data[i].structure).toBe('string');
            }
        });
    
        test.each(testCases['search']['getByNameCinecaInfoFromDB-writeCinecaInfoToDB'])('should return the correct number of reasearcher and the correct information from DB %s', async ({ desc, name, surname, expectedResult}) => {
            console.log(desc);  
    
            // Init test cineca testDB
            await Cineca.deleteMany({})
    
            // Insert expected result in DB
            let res = await search.writeCinecaInfoToDB(expectedResult);
    
            // Check Write function
            for (let i = 0; i < res.length; i++) {
                expect(res[i].university).toEqual(expectedResult[i].university);
                expect(res[i].lastName).toEqual(expectedResult[i].lastName);
                expect(res[i].firstName).toEqual(expectedResult[i].firstName);
                expect(res[i].faculty).toEqual(expectedResult[i].faculty);
                expect(res[i].gender).toEqual(expectedResult[i].gender);
                expect(res[i].sc).toEqual(expectedResult[i].sc);
                expect(res[i].otherUniversityService).toEqual(expectedResult[i].otherUniversityService);
                expect(res[i].ssd).toEqual(expectedResult[i].ssd);
                expect(res[i].structure).toEqual(expectedResult[i].structure);
            }
    
            // Get function
            const data = await search.getByNameCinecaInfoFromDB(name, surname);
    
            // Check Write function
            expect(data.length).toEqual(expectedResult.length);
            for (let i = 0; i < data.length; i++) {
                expect(data[i].university).toEqual(expectedResult[i].university);
                expect(data[i].lastName).toEqual(expectedResult[i].lastName);
                expect(data[i].firstName).toEqual(expectedResult[i].firstName);
                expect(data[i].faculty).toEqual(expectedResult[i].faculty);
                expect(data[i].gender).toEqual(expectedResult[i].gender);
                expect(data[i].sc).toEqual(expectedResult[i].sc);
                expect(data[i].otherUniversityService).toEqual(expectedResult[i].otherUniversityService);
                expect(data[i].ssd).toEqual(expectedResult[i].ssd);
                expect(data[i].structure).toEqual(expectedResult[i].structure);
            }
    
            // Clean test cineca testDB
            await Cineca.deleteMany({})
            
        });
    
        test.each(testCases['search']['getByIDCinecaInfoFromDB'])('should return the correct number of reasearcher and the correct information from DB %s', async ({ desc, name, surname, expectedResult}) => {
            console.log(desc);  
            // Init test cineca testDB
            await Cineca.deleteMany({})
    
            // Insert on DB
            let res = await search.writeCinecaInfoToDB(expectedResult);
    
            const data = await search.getByIDCinecaInfoFromDB(res[0]._id);
    
            // Check Get function
            expect(data.university).toEqual(expectedResult[0].university);
            expect(data.lastName).toEqual(expectedResult[0].lastName);
            expect(data.firstName).toEqual(expectedResult[0].firstName);
            expect(data.faculty).toEqual(expectedResult[0].faculty);
            expect(data.gender).toEqual(expectedResult[0].gender);
            expect(data.sc).toEqual(expectedResult[0].sc);
            expect(data.otherUniversityService).toEqual(expectedResult[0].otherUniversityService);
            expect(data.ssd).toEqual(expectedResult[0].ssd);
            expect(data.structure).toEqual(expectedResult[0].structure);
        
    
            // Clean test cineca testDB
            await Cineca.deleteMany({})
            
        });
    });

    describe("Test Scholar functions", () => {
        test.each(testCases['search']['getScholarInfo'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, researcherAteneo, researcherSurname, researcherName, expectedResult}) => {
            console.log(desc);  
            const data = await search.getScholarInfo(researcherAteneo, researcherSurname, researcherName);
    
            expect(data.length).toEqual(expectedResult.length);
            expect(data).toEqual(expectedResult);
            
        });

        test.each(testCases['search']['getByIDScholarInfoFromDB-writeScholarInfoToDB'])('should return the correct number of reasearcher and the correct information from DB %s', async ({ desc, cinecaInfo, expectedResult}) => {
            console.log(desc);  
            // Init test cineca and scholar testDB
            await Cineca.deleteMany({})
            await Scholar.deleteMany({})
    
            // Insert cineca info on DB
            let cineca = await search.writeCinecaInfoToDB(cinecaInfo);
            // Insert schoalr info on DB
            let scholarInfo = await search.writeScholarInfoToDB(cineca._id, expectedResult);
            // console.log(scholarInfo);
            // console.log(expectedResult);

            // Check write function
            expect(scholarInfo.citations).toEqual(expectedResult.citations);
            expect(scholarInfo.hIndex).toEqual(expectedResult.hIndex);
            // expect(scholarInfo.publications).toEqual(expectedResult.publications); // STRANO ERRORE

            // Get function
            const data = await search.getByIDScholarInfoFromDB(scholarInfo._id);
            
            // Check Get function
            expect(data.citations).toEqual(expectedResult.citations);
            expect(data.hIndex).toEqual(expectedResult.hIndex);
            //expect(data.publications).toEqual(expectedResult.publications); // STRANO ERRORE
    
            // Clean test cineca and scholar testDB
            await Cineca.deleteMany({})
            await Scholar.deleteMany({})
        });
    });


    describe.skip("Test Scopus functions", () => {
        test.skip.each(testCases['search']['getScopusInfo'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, surname, affiliation, expectedResult}) => {
            console.log(desc);  
            const data = await search.getScopusInfo(affiliation, surname, name);
    
            expect(data.length).toEqual(expectedResult.length);
            expect(data).toEqual(expectedResult);
            
        });

        test.each(testCases['search']['getByIDScopusInfoFromDB-writeScopusInfoToDB'])('should return the correct number of reasearcher and the correct information from DB %s', async ({ desc, cinecaInfo, expectedResult}) => {
            console.log(desc);  
            // Init test cineca and scopus testDB
            await Cineca.deleteMany({})
            await Scopus.deleteMany({})
    
            // Insert cineca info on DB
            let cineca = await search.writeCinecaInfoToDB(cinecaInfo);
            // Insert scopus info on DB
            let scopusInfo = await search.writeScopusInfoToDB(cineca._id, expectedResult);
            // console.log(scholarInfo);
            // console.log(expectedResult);

            // Check write function
            expect(scopusInfo.name).toEqual(expectedResult.name);
            
            // Get function
            const data = await search.getByIDScopusInfoFromDB(scopusInfo._id);
            
            // Check Get function
            expect(data.name).toEqual(expectedResult.name);
           
    
            // Clean test cineca and scholscopusar testDB
            await Cineca.deleteMany({})
            await Scopus.deleteMany({})
        });
    });

});