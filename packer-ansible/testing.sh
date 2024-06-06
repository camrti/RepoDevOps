#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

### 1) Delete all containers and images

# Array of container names to stop
containers=("my-search-container-test" "my-cineca-container-test" "my-scholar-container-test" "my-scopus-container-test")

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

### 2)

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

echo "Starting ansible manage_container playbook..."
ansible-playbook "packer-ansible/manage_containers_test.yml"
ansible_status=$?

if [[ $ansible_status -eq 0 ]]; then
    echo "Ansible manage_container playbook completed successfully."
else
    echo "Ansible manage_container playbook failed. Aborting push."
    exit 1
fi

# Run Newman tests
echo "Starting newman tests..."
PATH=/home/devops/.nvm/versions/node/v20.14.0/bin:$PATH
newman run "postman/postman_collection.json" -d "postman/reasearcher.json" -r json --reporter-json-export "postman/output.json"
newman_status=$?

if [[ $newman_status -eq 0 ]]; then
    echo "Newman tests completed successfully. Pushing to origin/main..."
    rm -f "postman/output.json"
    echo "Starting ansible delete_containers playbook..."
    ansible-playbook "packer-ansible/delete_containers.yml"
else
    echo "Newman tests failed. Aborting push."
    echo "Starting ansible stop_containers playbook..."
    ansible-playbook "packer-ansible/stop_containers.yml"
    exit 1
fi


exit 0