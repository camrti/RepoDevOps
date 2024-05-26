const fs = require('fs');
const path = require('path');
const scopus = require('./scopus.js'); 

const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scopusTestCases.json'), 'utf8'));

describe('Testing scopus.js module', () => {

    describe('Testing getAuthorId function', () => {
        test.each(testCases['scopus']['getAuthorId'])('search should return the correct authorID or null for %s', async ({ desc, name, surname, affiliation,  expectedResult, throwError}) => {
            console.log("Test Case: ", desc);
            if (!throwError){
                try {
                    const authorID = await scopus.getAuthorId(name, surname, affiliation);
                    expect(authorID).toEqual(expectedResult);
                } catch (error) {
                    // If an error occurs unexpectedly, fail the test
                    fail(error);
                }
            } else {
                try {
                    await scopus.getAuthorId(name, surname, affiliation);
                    // If no error occurs when error was expected, fail the test
                    fail('Expected an error but did not get one');
                } catch (error) {
                    // If an error occurs as expected, pass the test
                    expect(error).toBeInstanceOf(TypeError);
                }
            }
            
        });
    })

    describe('Testing getAuthorDetails function', () => {
        test.each(testCases['scopus']['getAuthorDetails'])('search should return the correct author detail or null for %s', async ({ desc, authorId,  expectedResult, throwError}) => {
            console.log("Test Case: ", desc);
            const authorDetails = await scopus.getAuthorDetails(authorId)
            expect(authorDetails).toEqual(expectedResult);
        });
    })
    
});