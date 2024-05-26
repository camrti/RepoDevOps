// DA FINIRE

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getResearchers, getPublications } = require('./search.js');
const { closeConnection } = require('../database/connection.js');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'searchTestCases.json'), 'utf8'));

describe.skip("Test search.js module", () => {

    afterAll(async () => {
        // Close the MongoDB connection after all tests have completed
        await closeConnection();
    });

    test.each(testCases)('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult, expectedLength}) => {
          const data = await getResearchers('Researcher Name');    

    });

});