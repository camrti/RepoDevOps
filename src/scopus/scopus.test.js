const fs = require('fs');
const path = require('path');
const scopus = require('./scopus.js'); 

const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scopusTestCases.json'), 'utf8'));

describe.skip('Testing scopus.js module', () => {
    test.each(testCases['scopus'])('search should return the correct authorID or null for %s', async ({ desc, name, surname, affiliation,  expectedResult}) => {
        console.log("Test Case: ", desc);
        const authorID = await scopus.getAuthorId(name, surname, affiliation)
        expect(authorID).toEqual(expectedResult);
    });
});