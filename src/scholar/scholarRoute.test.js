const express = require('express');
const supertest = require('supertest');
const scholarRoute = require('./scholarRoute.js');
const fs = require('fs');
const path = require('path');

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scholarTestCases.json'), 'utf8'));

const app = express();
app.use('/', scholarRoute);

describe('Testing scholarRoute', () => {
    test.each(testCases['scholarRoute'])('GET /parse should return the correct status code and response for %s', 
        async ({ id, desc, query, expectedStatusCode, expectedResult }) => {

            console.log(`${id}: ${desc}`);

            const response = await supertest(app)
                .get('/parse')
                .query(query)
            expect(response.body).toEqual(expectedResult);
            expect(response.status).toEqual(expectedStatusCode);
    });
});
