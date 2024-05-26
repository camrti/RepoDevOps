
const publication = require('./publication');
const fs = require('fs');
const path = require('path');
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'publicationTestCases.json'), 'utf8'));

describe('Testing parseLinkToProfile function', () => {
    test.each(testCases['publication']['parseLinkToProfile'])('should return the correct profile link for $desc', async ({ desc, searchQuery, expectedResult }) => {
        const result = await publication.parseLinkToProfile(searchQuery);
        expect(result).toEqual(expectedResult);
    });
})

describe('Testing parsePublications function', () => {
    test.each(testCases['publication']['parsePublications'])('should return the correct number of publications and the correct information for $desc', async ({ desc, profileLink, expectedResult}) => {
        const result = await publication.parsePublications(profileLink);
        
        expect(result.length).toBe(expectedResult.expectedLength);
        for (let i = 0; i < result.length; i++) {
            expect(result[i].title).toEqual(expectedResult[i].title);
            expect(result[i].authors).toEqual(expectedResult[i].authors);
            expect(result[i].paperType).toEqual(expectedResult[i].paperType);
            expect(result[i].year).toEqual(expectedResult[i].year);
            expect(result[i].citationCount).toEqual(expectedResult[i].citationCount);
            expect(result[i].publicationLink).toEqual(expectedResult[i].publicationLink);
        }
    });
});