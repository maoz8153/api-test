#!/bin/bash
version=$(grep -oP '^VERSION=\K.*' ./.env)
echo $version
data=$(curl -u ) 
buildNumber=$(sed -ne '/buildNumber/{s/.*<buildNumber>\(.*\)<\/buildNumber>.*/\1/p;q;}' <<< "$data")
timestamp=$(sed -ne '/timestamp/{s/.*<timestamp>\(.*\)<\/timestamp>.*/\1/p;q;}' <<< "$data")
echo $timestamp
echo $buildNumber
curl -u  -o fgpp-bff.tar.gz  -k