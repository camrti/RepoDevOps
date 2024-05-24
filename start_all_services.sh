#!/bin/sh

# Run search service
cd src/search/
node app.js &

# Run researcher service
cd ../researcher/
node app.js &

# Run publication service
cd ../publication/
node app.js &

# Run publication service
cd ../scopus/
node app.js &

