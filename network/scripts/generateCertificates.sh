#!/usr/bin/env bash

configPath=./crypto-config.yaml

command="../bin/cryptogen generate --config=${configPath}"

eval "cd .. && ${command}"