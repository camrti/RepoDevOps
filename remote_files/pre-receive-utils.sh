#!/bin/bash 

cd "/home/devops/RepoDevOps"
git checkout develop
git pull
ansible-playbook "/home/devops/RepoDevOps/packer-ansible/testing.yml"