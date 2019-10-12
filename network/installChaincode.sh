#!/usr/bin/env bash
docker exec cli peer chaincode install -n universityCertificate -v 0 -p /opt/gopath/src/github.com/universityCertificate/typescript -l "node"

docker exec cli peer chaincode instantiate -n universityCertificate -v 0 -C mychannel -l "node" -c '{"Args":[]}'

docker exec cli peer chaincode invoke -n universityCertificate -C mychannel -c '{"Args":["getCertificate", "certificate123"]}'