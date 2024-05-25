const fs = require('fs');
const path = require('path');
const researcher = require('./researcher.js');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'researcherTestCases.json'), 'utf8'));

describe.skip('Testing getCinecaData function', () => {

    test.each(testCases['researcher'])('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case: ", desc);
        
        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        expect(data.length).toEqual(expectedLength);

        for (let i = 0; i < minLength; i++) {
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
    });

    test.each(testCases['researcher'])(`should return the correct type for each researcher field`, async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case Type: ", desc);

        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        for (let i = 0; i < minLength; i++) {
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
    
});
