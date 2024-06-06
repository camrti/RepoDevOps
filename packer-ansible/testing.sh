#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

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


echo "Starting packer_builds.json..."
packer build "packer-ansible/packer_builds.json" 

if [[ $? -eq 0 ]]; then
    echo "Packer build script completed successfully."
else
    echo "Packer build script failed. Aborting push."
    exit 1
fi

docker network create --driver=bridge --subnet=192.168.100.0/24 devops-net

# Remove the temp file for check tests, if it exists
if [ -f /tmp/test_result.txt ]; then
    rm /tmp/test_result.txt
fi

ansible-playbook "packer-ansible/manage_containers_test.yml"

if [[ $? -eq 0 ]]; then
    echo "Ansible manage_container playbook completed successfully."
else
    echo "Ansible manage_container playbook failed. Aborting push."
    exit 1
fi
echo "$?"

echo "Starting newman tests..."
echo "$?"
echo "Current working directory:"
pwd

echo "Current PATH:"
echo $PATH

PATH=/home/devops/.nvm/versions/node/v20.14.0/bin:$PATH
echo "Updated PATH:"
echo $PATH

# Run Newman tests
newman run "postman/postman_collection.json" -d "postman/reasearcher.json" -r json --reporter-json-export "postman/output.json"
newman_stat=$?

echo "$newman_stat"

if [[ $newman_stat -eq 0 ]]; then
    echo "Newman tests completed successfully. Pushing to origin/main..."
else
    echo "Newman tests failed. Aborting push."
    exit 1
fi


exit 0