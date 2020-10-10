#!/bin/bash
server=$(grep -oP '^SERVER1=\K.*' ../config/server.env)
echo $server
data=$(curl -u $server/api/resource/mode) 
slave=$(sed -ne '/SLAVE/{s/.*<SLAVE>\(.*\)<\/SLAVE>.*/\1/p;q;}' <<< "$data")
master=$(sed -ne '/MASTER/{s/.*<MASTER>\(.*\)<\/MASTER>.*/\1/p;q;}' <<< "$data")
