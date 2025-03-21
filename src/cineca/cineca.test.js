const fs = require('fs');
const path = require('path');
const cineca = require('./cineca.js');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cinecaTestCases.json'), 'utf8'));

describe('Testing getCinecaData function', () => {

    test.each(testCases['cineca'])('should return the correct number of reasearcher and the correct information for %s',
        async ({ id, desc, name, expectedResult}) => {

            console.log(`${id}: ${desc}`);
            
            const data = await cineca.getCinecaData(name);

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
    });

    test.each(testCases['cineca'])(`should return the correct type for each researcher field`,
        async ({ id, desc, name }) => {
            
            console.log(`${id}: ${desc}`);

            const data = await cineca.getCinecaData(name);
            
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
    
});
