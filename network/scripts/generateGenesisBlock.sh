#!/usr/bin/env bash

outputDir=./channel-artifacts/genesis.block
profile=OrdererGenesis

command="../bin/configtxgen -profile ${profile} -outputBlock ${outputDir}"

eval "cd .. && ${command}"