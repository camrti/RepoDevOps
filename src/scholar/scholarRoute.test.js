const express = require('express');
const supertest = require('supertest');
const scholarRoute = require('./scholarRoute.js');
const fs = require('fs');
const path = require('path');
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scholarTestCases.json'), 'utf8'));
const app = express();

// Set the views directory to the correct location
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/', scholarRoute);

describe.skip('Testing scholarRoute', () => {
    test.each(testCases['scholarRoute'])('GET /parse should return the correct status code and response for %s', async ({ desc, query, expectedStatusCode, expectedResult }) => {
        console.log("Test Case: ", desc);
        const response = await supertest(app)
            .get('/parse')
            .query(query)
        expect(response.body).toEqual(expectedResult);
        expect(response.status).toEqual(expectedStatusCode);
    });
});
