#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

### 1) Delete all containers

##### THIS SHOULD BE PERFORMED WITH ANSIBLE

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

#####

echo "Building packer deploy images..."
packer build "packer-ansible/packer_deploy.json" 
packer_status=$?

if [[ $packer_status -eq 0 ]]; then
    echo "Packer build script completed successfully."
else
    echo "Packer build script failed. Aborting push."
    exit 1
fi

echo "Starting ansible playbook..."
ansible-playbook "packer-ansible/manage_containers_deploy.yml"

if [[ $? -eq 0 ]]; then
    echo "Ansible manage_container playbook for deployment completed successfully."
else
    echo "Ansible manage_container playbook for deployment failed. Aborting Deployment."
    exit 1
fi

docker rmi $(docker images -f "dangling=true" -q)
exit 0