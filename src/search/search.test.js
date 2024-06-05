const fs = require('fs');
const express = require('express');
const path = require('path');
const search = require('./search.js');
const cinecaRoute = require('../cineca/cinecaRoute.js');
const scholarRoute = require('../scholar/scholarRoute.js');
const scopusRoute = require('../scopus/scopusRoute.js'); 
const CINECA_PORT=8081
const SCHOLAR_PORT=8082
const SCHOPUS_PORT=8083

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
  
    });

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

    test.each(testCases['search']['getScholarInfo'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, researcherAteneo, researcherSurname, researcherName, expectedResult}) => {
        console.log(desc);  
        const data = await search.getScholarInfo(researcherAteneo, researcherSurname, researcherName);

        expect(data.length).toEqual(expectedResult.length);
        expect(data).toEqual(expectedResult);
        
    });

    test.each(testCases['search']['getScopusInfo'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, surname, affiliation, expectedResult}) => {
        console.log(desc);  
        const data = await search.getScopusInfo(affiliation, surname, name);

        expect(data.length).toEqual(expectedResult.length);
        expect(data).toEqual(expectedResult);
        
    });

});