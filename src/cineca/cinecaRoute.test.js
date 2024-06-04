const express = require('express');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const cinecaRoute = require('./cinecaRoute.js');

const app = express();
app.use('/', cinecaRoute);

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cinecaTestCases.json'), 'utf8'));

describe('Testing cinecaRoute', () => {

    test.each(testCases['cinecaRoute'])('GET /search should return the correct status code for %s', async ({ desc, name, expectedStatusCode, expectedResult}) => {
        console.log("Test Case: ", desc);
        const response = await supertest(app)
            .get('/search')
            .query({ researcherName: name })
        expect(response.status).toBe(expectedStatusCode);
        expect(response.body).toEqual(expectedResult)
    });

});