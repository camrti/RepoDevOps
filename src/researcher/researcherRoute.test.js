const express = require('express');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const researcherRoute = require('./researcherRoute.js');

const app = express();
app.use('/', researcherRoute);

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'researcherTestCases.json'), 'utf8'));

describe.skip('Testing researcherRoute', () => {

    test.each(testCases['researcherRoute'])('GET /search should return the correct status code for %s', async ({ desc, name, expectedStatusCode}) => {
        console.log("Test Case: ", desc);
        await supertest(app)
            .get('/search')
            .query({ researcherName: name })
            .expect(expectedStatusCode);
    });

});