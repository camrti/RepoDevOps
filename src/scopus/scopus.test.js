const fs = require('fs');
const path = require('path');
const scopus = require('./scopus.js'); 

const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scopusTestCases.json'), 'utf8'));

describe('Testing scopus.js module', () => {

    describe('Testing getAuthorId function', () => {
        test.each(testCases['scopus']['getAuthorId'])('search should return the correct authorID or null for %s', async ({ desc, name, surname, affiliation,  expectedResult, error}) => {
            console.log("Test Case: ", desc);
            if (!error){
                const authorID = scopus.getAuthorId(name, surname, affiliation)
                expect(authorID).toEqual(expectedResult);
            } else {
                expect(scopus.getAuthorId(name, surname, affiliation)).toThrow(expectedResult)
            }
            
        });
    })

    describe('Testing getAuthorDetails function', () => {
        test.each(testCases['scopus']['getAuthorDetails'])('search should return the correct author detail or null for %s', async ({ desc, authorId,  expectedResult, error}) => {
            console.log("Test Case: ", desc);
            if (!error){
                const authorDetails = await scopus.getAuthorDetails(authorId)
                expect(authorDetails).toEqual(expectedResult);
            } else {
                expect(scopus.getAuthorDetails(authorId)).toThrow(expectedResult)
            }
            
        });
    })
    
});