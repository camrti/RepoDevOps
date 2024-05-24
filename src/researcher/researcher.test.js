const fs = require('fs');
const path = require('path');
const researcher = require('./researcher.js');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'researcherTestCases.json'), 'utf8'));

describe('Testing getCinecaData function', () => {

    test.each(testCases)('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case: ", desc);
        
        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        expect(data.length).toEqual(expectedLength);

        for (let i = 0; i < minLength; i++) {
            expect(data[i].ateneo).toEqual(expectedResult[i].ateneo);
            expect(data[i].cognome).toEqual(expectedResult[i].cognome);
            expect(data[i].nome).toEqual(expectedResult[i].nome);
            expect(data[i].facolta).toEqual(expectedResult[i].facolta);
            expect(data[i].genere).toEqual(expectedResult[i].genere);
            expect(data[i].sc).toEqual(expectedResult[i].sc);
            expect(data[i].servizio_altro_ateneo).toEqual(expectedResult[i].servizio_altro_ateneo);
            expect(data[i].ssd).toEqual(expectedResult[i].ssd);
            expect(data[i].struttura).toEqual(expectedResult[i].struttura);
        }
    });

    test.each(testCases)(`should return the correct type for each researcher field`, async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case Type: ", desc);

        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        for (let i = 0; i < minLength; i++) {
            expect(typeof data[i].ateneo).toBe('string');
            expect(typeof data[i].cognome).toBe('string');
            expect(typeof data[i].nome).toBe('string');
            expect(typeof data[i].facolta).toBe('string');
            expect(typeof data[i].genere).toBe('string');
            expect(typeof data[i].sc).toBe('string');
            expect(typeof data[i].servizio_altro_ateneo).toBe('string');
            expect(typeof data[i].ssd).toBe('string');
            expect(typeof data[i].struttura).toBe('string');
        }
    });
    
});
