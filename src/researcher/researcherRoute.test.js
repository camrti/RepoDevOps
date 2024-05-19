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
            name: 'Francesco_Moscato',
            expectedStatusCode: 200
        },
        
        {   
            name: 'Pasquale_Caggiano',
            expectedStatusCode: 404
        }
    
    ];

    test('GET / should render index template', async () => {
        const res = await supertest(app)
        .get('/')
        .expect(200);
    });

    test('GET /search should render search template with correct status code', async () => {
        const res = await supertest(app)
        .get('/search')
        .query({ researcherName: testCases[0].name })
        .expect(testCases[0].expectedStatusCode)
    });

    test('GET /search should render search template', async () => {
        const res = await supertest(app)
        .get('/search')
        .query({ researcherName: testCases[1].name })
        .expect(testCases[1].expectedStatusCode);
    });

});