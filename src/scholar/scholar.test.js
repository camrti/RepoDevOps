const scholar = require('./scholar.js');
const fs = require('fs');
const path = require('path');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scholarTestCases.json'), 'utf8'));

describe('Testing cineca.js functions', () => {

    describe('Testing parseLinkToProfile function', () => {
        test.each(testCases['scholar']['parseLinkToProfile'])('should return the correct profile link for $desc', 
            async ({ id, desc, searchQuery, expectedResult }) => {

                console.log(`${id}: ${desc}`);

                const result = await scholar.parseLinkToProfile(searchQuery);
                expect(result).toEqual(expectedResult);
        });
    })

    describe('Testing parsePublications function', () => {
        test.each(testCases['scholar']['parsePublications'])('should return the correct number of publications and the correct information for $desc',
            async ({ id, desc, profileLink, expectedResult}) => {
                
                console.log(`${id}: ${desc}`);

                const result = await scholar.parsePublications(profileLink);
                
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

});