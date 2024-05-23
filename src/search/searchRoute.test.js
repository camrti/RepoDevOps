// DA FINIRE

const request = require('supertest');
const express = require('express');
const searchRoute = require('./searchRoute.js'); // Update the path to match your module

const app = express();
app.use('/', searchRoute);

describe.skip('Search Router', () => {
  describe('GET /search_researchers', () => {
    test('should respond with status 200 and render search page with researchers', async () => {
      const response = await request(app)
        .get('/search_researchers')
        .query({ researcherName: 'John Doe' });


    });


  });

  describe('GET /search_publications', () => {
    test('should respond with status 200 and render publications page with publications', async () => {
      const response = await request(app)
        .get('/search_publications')
        .query({ name: 'John', surname: 'Doe', ateneo: 'SomeAteneo' });

    });

  });
});
