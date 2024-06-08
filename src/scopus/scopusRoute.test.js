const express = require('express');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const scopusRoute = require('./scopusRoute.js'); 

// Load the test cases from the JSON file
const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scopusTestCases.json'), 'utf8'));

const app = express();
app.use('/', scopusRoute);

describe.skip('Testing scopusRoute', () => {
    test.each(testCases['scopusRoute'])('search should return the correct authorID or null for %s', 
        async ({ id, desc, name, surname, affiliation,  expectedResult, expectedStatusCode}) => {

            console.log(`${id}: ${desc}`);

            const response = await supertest(app)
                .get('/scopus')
                .query({ name, surname, affiliation });
                
            expect(response.status).toBe(expectedStatusCode);
            expect(response.body).toEqual(expectedResult)
    });
})
