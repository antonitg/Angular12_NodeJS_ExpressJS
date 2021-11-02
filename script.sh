#!/bin/bash

if [[ -n `docker ps --all | grep node-server` ]]
then
    docker start node-server
else
    if [[ -n `docker images --all | grep docker-server` ]]
    then
        docker run -d -p 4000:4000 -it --name node-server docker-server
    else
        docker build --tag docker-server server/
        docker run -d -p 4000:4000 -it --name node-server docker-server
    fi
fi

if [[ -n `docker ps --all | grep node-client` ]]
then
    docker start node-client
else
    if [[ -n `docker images --all | grep docker-client` ]]
    then
        docker run -d -p 4200:4200 -it --name node-client docker-client
    else
        docker build --tag docker-client client/
        docker run -d -p 4200:4200 -it --name node-client docker-client
    fi
fi