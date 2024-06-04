# Script to push my-scopus-image, my-scholar-image, my-cineca-image, my-search-image to docker hub vcampagnano

docker tag my-scholar-image vcampagnano/my-scholar-image
docker push vcampagnano/my-scholar-image

docker tag my-cineca-image vcampagnano/my-cineca-image
docker push vcampagnano/my-cineca-image

docker tag my-search-image vcampagnano/my-search-image
docker push vcampagnano/my-search-image

docker tag my-scopus-image vcampagnano/my-scopus-image
docker push vcampagnano/my-scopus-image
