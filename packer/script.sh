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

sh packer/push_images_to_hub.sh

docker network create --driver=bridge --subnet=192.168.100.0/24 devops-net

ansible-playbook packer/manage_containers.yml

