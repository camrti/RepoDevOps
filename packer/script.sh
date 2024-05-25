#!/bin/sh

if [ "$(docker ps -q)" ]; then
    docker stop $(docker ps -a -q)
fi

if [ "$(docker ps -a -q)" ]; then
    docker rm $(docker ps -a -q)
fi

if [ "$(docker images -a | grep 'my' | awk '{print $3}')" ]; then
    docker rmi -f $(docker images -a | grep 'my' | awk '{print $3}')
fi

packer build packer/alpine.json 


ansible-playbook -i packer/inventory.ini packer/playbook.yaml

