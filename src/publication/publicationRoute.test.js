const express = require('express');
const supertest = require('supertest');
const publicationRoute = require('./publicationRoute.js');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

// Set the views directory to the correct location
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/', publicationRoute);

describe('Testing publicationRoute', () => {
    let testCases = [
        {   
            desc: "/GET with missing 'value' parameter",
            query: { name: 'Giovanni', surname: 'Russo' },
            expectedStatusCode: 400,
            expectedResponse: 'Missing search query parameter "value"'
        },
        {   
            desc: "/GET with no profile link found",
            query: { name: 'Ettore', surname: 'Napoli', value: 'someSearchValue' },
            expectedStatusCode: 404,
            expectedResponse: 'No publication found'
        }
    ];

    test.each(testCases)('GET /parse should return the correct status code and response for %s', async ({ desc, query, expectedStatusCode, expectedResponse }) => {
        console.log("Test Case: ", desc);
        await supertest(app)
            .get('/parse')
            .query(query)
            .expect(expectedStatusCode, expectedResponse);
    });
});
