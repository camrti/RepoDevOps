// DA FINIRE

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getResearchers, getPublications } = require('./search.js');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'searchTestCases.json'), 'utf8'));

describe.skip('getResearchers', () => {

    test.each(testCases)('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult, expectedLength}) => {
        const data = await getResearchers('Researcher Name');    

  });

  test('should handle errors and return an empty array', async () => {

    const data = await getResearchers('Researcher Name');    

  });
});

describe.skip('getPublications', () => {
  test('should fetch data from PublicationRoute2 and return response data', async () => {
   
    // Call the function
    const data = await getPublications('Ateneo', 'Surname', 'Name');

  });

  test('should handle errors and return an empty object', async () => {

    const data = await getPublications('Ateneo', 'Surname', 'Name');


  });
});
