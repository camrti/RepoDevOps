const express = require('express');
const supertest = require('supertest');
const researcherRoute = require('./researcherRoute.js');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

// Set the views directory to the correct location
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/', researcherRoute);

describe('Testing researcherRoute', () => {
    let testCases = [
        {   
            desc: "/GET For a Single Researcher",
            name: 'Francesco_Moscato',
            expectedStatusCode: 200
        },

        {   
            desc: "/GET For a Multiple Researcher",
            name: 'Giovanni_Russo',
            expectedStatusCode: 200
        },
        
        {   
            desc: "/GET For a Invalid Researcher",
            name: 'Pasquale_Caggiano',
            expectedStatusCode: 404
        }
    
    ];

    test.each(testCases)('GET /search should return the correct status code for %s', async ({ desc, name, expectedStatusCode }) => {
        console.log("Test Case: ", desc);
        await supertest(app)
            .get('/search')
            .query({ researcherName: name })
            .expect(expectedStatusCode);
    });

});