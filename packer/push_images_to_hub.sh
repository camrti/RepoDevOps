# Script to push my-publication-image, my-researcher-image, my-search-image to docker hub vcampagnano

docker tag my-publication-image vcampagnano/my-publication-image
docker push vcampagnano/my-publication-image

docker tag my-researcher-image vcampagnano/my-researcher-image
docker push vcampagnano/my-researcher-image

docker tag my-search-image vcampagnano/my-search-image
docker push vcampagnano/my-search-image

docker tag my-scopus-image vcampagnano/my-scopus-image
docker push vcampagnano/my-scopus-image
