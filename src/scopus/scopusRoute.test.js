const express = require('express');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const scopusRoute = require('./scopusRoute.js'); 

const app = express();
app.use('/', scopusRoute);

const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scopusTestCases.json'), 'utf8'));

describe.skip('Testing scopusRoute', () => {
    test.each(testCases['scopusRoute'])('search should return the correct authorID or null for %s', async ({ desc, name, surname, affiliation,  expectedResult, expectedStatusCode}) => {
        console.log("Test Case: ", desc);
        await supertest(app)
            .get('/scopus')
            .query({ 
                name: name,
                surname: surname,
                ateneo: affiliation 
            })
            .expect(expectedResult)
            .expect(expectedStatusCode);
    });
})
