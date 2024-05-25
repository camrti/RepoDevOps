#!/bin/sh

docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)

docker rmi -f $(docker images -a | grep 'my' | awk '{print $3}')

packer build packer/alpine.json 


ansible-playbook -i packer/inventory.ini packer/playbook.yaml

