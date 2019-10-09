#!/usr/bin/env bash

docker exec -it cli bash
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/network.com/orderers/orderer.network.com/msp/tlscacerts/tlsca.network.com-cert.pem
peer chaincode install -n machine -p /opt/gopath/src/github.com/chaincode/machine/typescript -v 1.0 -l "node"

peer chaincode instantiate -o orderer.network.com:7050 --tls --cafile $ORDERER_CA -C channelall -n machine -l "node" -v 1.0 -c '{"Args":[]}' -P "OR('Org1MSP.peer', 'Org2MSP.peer', 'Org3MSP.peer')"

#Create test machine
peer chaincode invoke -o orderer.network.com:7050 --tls --cafile $ORDERER_CA -C channelall -n machine -c '{"Args":["createMachine", "machineId", "machineName", "timestamp"]}'

#Query test machine
peer chaincode query -o orderer.network.com:7050 --tls --cafile $ORDERER_CA -C channelall -n machine -c '{"Args":["getMachine", "machineId"]}'