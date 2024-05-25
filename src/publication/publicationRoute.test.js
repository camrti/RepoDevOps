const express = require('express');
const supertest = require('supertest');
const publicationRoute = require('./publicationRoute.js');
const fs = require('fs');
const path = require('path');
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'publicationTestCases.json'), 'utf8'));
const app = express();
app.set('view engine', 'ejs');

// Set the views directory to the correct location
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/', publicationRoute);

describe('Testing publicationRoute', () => {
    test.each(testCases['publicationRoute'])('GET /parse should return the correct status code and response for %s', async ({ desc, query, expectedStatusCode, expectedResponse }) => {
        console.log("Test Case: ", desc);
        console.log("QUERYYYYYY",query);
        await supertest(app)
            .get('/parse')
            .query(query)
            .expect(expectedResponse)
            .expect(expectedStatusCode)   
    });
});
