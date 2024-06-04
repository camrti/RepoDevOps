#!/bin/sh

# Array of container names to stop
containers=("my-search-container" "my-cineca-container" "my-scholar-container" "my-scopus-container")

# Loop through the array and stop each container
for container in "${containers[@]}"
do
    echo "Stopping container: $container"
    docker stop "$container"
done
echo "All containers have been stopped."


# Loop through the array and remove each container
for container in "${containers[@]}"
do
    echo "Removing container: $container"
    docker rm "$container"
done
echo "All containers have been removed."

# Array of container images to remove
images=("my-search-image" "my-cineca-image" "my-scholar-image" "my-scopus-image")

# Loop through the array and remove each image
for image in "${images[@]}"
do
    echo "Removing image: $image"
    docker rmi "$image"
done
echo "All images have been removed."

packer build packer/packer_builds.json 

docker network create --driver=bridge --subnet=192.168.100.0/24 devops-net

ansible-playbook packer/manage_containers.yml

