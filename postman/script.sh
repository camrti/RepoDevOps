#!/bin/bash

# Run Newman tests
newman run my_test_collection.json

# Run Ansible playbook
ansible-playbook newman_test_check.yaml