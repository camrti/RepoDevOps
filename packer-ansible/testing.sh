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

# Run Newman tests
Output=$(newman run "postman/postman_collection.json" -d "postman/reasearcher.json" -r json --reporter-json-export "postman/output_new2.json")
newman_stat=$?

echo "$newman_stat"
echo "$Output"

if [[ $newman_stat -eq 0 ]]; then
    echo "Newman tests completed successfully."
else
    echo "Newman tests failed. Aborting push."
    echo "$Output"
    exit 1
fi

ansible-playbook "packer-ansible/newman_test_check.yaml"

if [[ $? -eq 0 ]]; then
    echo "Newman command error completed successfully."
else
    echo "Newman command error failed. Aborting push."
    exit 1
fi

if [ -f /tmp/test_result.txt ]; then
    echo "All newman tests passed."
    exit 0
else
    echo "All newman tests failed."
    rm /tmp/test_result.txt
    exit 1
fi