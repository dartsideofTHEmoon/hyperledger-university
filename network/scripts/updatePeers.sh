#!/usr/bin/env bash

configtxgenPath=../bin/configtxgen

channel=$1

for org in "${@:2}"
do
    channel_name=$(echo $channel | tr '[:upper:]' '[:lower:]')
    command="${configtxgenPath} -profile ${channel} -outputAnchorPeersUpdate ./channel-artifacts/${org}anchors_${channel_name}.tx -channelID ${channel_name} -asOrg ${org}"
    eval "cd .. && ${command} && cd -"
done


