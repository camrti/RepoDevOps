#!/bin/bash 

cd "/home/devops/RepoDevOps"
git checkout main
git pull
ansible-playbook "/home/devops/RepoDevOps/packer-ansible/deployment.yml"
