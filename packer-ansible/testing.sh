#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

### 1) Stop and remove all running test containers
ansible-playbook "packer-ansible/delete_containers.yml"
echo "All test containers have been removed."

### 2) Delete all images
ansible-playbook "packer-ansible/delete_images.yml"
echo "All test images have been removed."

echo "Starting packer_builds.json..."
packer build "packer-ansible/packer_builds.json" 
packer_status=$?

if [[ $packer_status -eq 0 ]]; then
    echo "Packer build script completed successfully."
else
    echo "Packer build script failed. Aborting push."
    exit 1
fi

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