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

    test('GET / should render index template', async () => {
        console.log("Index Test Case");
        const res = await supertest(app)
        .get('/')
        .expect(200);
    });

    test.each(testCases)('GET /search should render search template with correct status code for %s', async ({ desc, name, expectedStatusCode }) => {
        console.log("Test Case: ", desc);
        await supertest(app)
            .get('/search')
            .query({ researcherName: name })
            .expect(expectedStatusCode);
    });

});