#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

# Build new versions of images
echo "Building packer test images..."
packer build "packer-ansible/packer_build_images.json" 
packer_status=$?

if [[ $packer_status -eq 0 ]]; then
    echo "Packer build script completed successfully."
else
    echo "Packer build script failed. Aborting push."
    exit 1
fi

# Start and manage new test containers
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
newman run "postman/postman_collection_test.json" -d "postman/researchers_test.json" -r json --reporter-json-export "postman/output_researcher.json" --folder search_researchers
newman_status1=$?
newman run "postman/postman_collection.json" -d "postman/publications_test.json" -r json --reporter-json-export "postman/output_publication.json" --folder search_publications
newman_status2=$?

if [[ $newman_status1 -eq 0 && $newman_status2 -eq 0 ]]; then
    echo "Newman tests completed successfully. Pushing to origin/main..."
    rm -f "postman/output_researcher.json" 
    rm -f "postman/output_publication.json"
    echo "Starting ansible delete_containers playbook..."
    ansible-playbook "packer-ansible/delete_test_containers.yml"
else
    echo "Newman tests failed. Aborting push."
    echo "Starting ansible stop_containers playbook..."
    ansible-playbook "packer-ansible/stop_test_containers.yml"
    exit 1
fi


exit 0