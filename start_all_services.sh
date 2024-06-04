#!/bin/sh

# Run search service
cd src/search/
node app.js &

# Run cineca service
cd ../cineca/
node app.js &

# Run scholar service
cd ../scholar/
node app.js &

# Run scopus service
cd ../scopus/
node app.js &

