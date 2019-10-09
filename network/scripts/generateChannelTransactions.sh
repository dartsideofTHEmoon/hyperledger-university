#!/usr/bin/env bash

configtxgenPath=../bin/configtxgen

declare -a channels=(${CHANNEL_ALL_PROFILE} ${CHANNEL_PRIVATE_PROFILE})

for channel in "${channels[@]}"
do
    channel_name=$(echo $channel | tr '[:upper:]' '[:lower:]')
    command="${configtxgenPath} -profile ${channel} -outputCreateChannelTx ./channel-artifacts/${channel_name}.tx -channelID ${channel_name}"
    eval "cd .. && ${command} && cd -"
done
