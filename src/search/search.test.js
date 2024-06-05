const fs = require('fs');
const path = require('path');
const search = require('./search.js');
const { closeConnection } = require('../database/connection.js');
const cinecaRoute = require('./cinecaRoute.js');
const scholarRoute = require('./scholarRoute.js');
const scopusRoute = require('./scopusRoute.js'); 

const cinecaApp = express();
cinecaApp.use('/', cinecaRoute);

const scholarApp = express();
scholarApp.use('/', scholarRoute);

const scopusApp = express();
scopusApp.use('/', scopusRoute);

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'searchTestCases.json'), 'utf8'));

describe("Test search.js module", () => {

    afterEach(async () => {
        // Close the MongoDB connection after all tests have completed
        closeConnection();
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