#!/bin/bash

# Base Path
BASE_PATH="/home/devops/RepoDevOps"
cd "${BASE_PATH}"

# Re-Create, start and manage new deployment containers
echo "Starting ansible playbook..."
ansible-playbook "packer-ansible/manage_containers_deploy.yml"

if [[ $? -eq 0 ]]; then
    echo "Ansible manage_container playbook for deployment completed successfully."
else
    echo "Ansible manage_container playbook for deployment failed. Aborting Deployment."
    exit 1
fi

exit 0