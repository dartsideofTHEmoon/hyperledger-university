#!/usr/bin/env bash

#Execute commands one by one in terminal

docker exec -it cli bash
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/network.com/orderers/orderer.network.com/msp/tlscacerts/tlsca.network.com-cert.pem
peer channel create -o orderer.network.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channelall.tx --tls --cafile $ORDERER_CA
peer channel create -o orderer.network.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel12.tx --tls --cafile $ORDERER_CA
peer channel join -b channelall.block --tls --cafile $ORDERER_CA
peer channel join -b channel12.block --tls --cafile $ORDERER_CA
peer channel update -o orderer.network.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_channelall.tx --tls --cafile $ORDERER_CA
peer channel update -o orderer.network.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_channel12.tx --tls --cafile $ORDERER_CA
#Exit docker container
docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.network.com/peers/peer0.org2.network.com/tls/ca.crt" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.network.com/users/Admin@org2.network.com/msp" -e "CORE_PEER_ADDRESS=peer0.org2.network.com:7051" -it cli bash
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/network.com/orderers/orderer.network.com/msp/tlscacerts/tlsca.network.com-cert.pem
peer channel join -b channelall.block --tls --cafile $ORDERER_CA
peer channel join -b channel12.block --tls --cafile $ORDERER_CA
peer channel update -o orderer.network.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_channelall.tx --tls --cafile $ORDERER_CA
peer channel update -o orderer.network.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_channel12.tx --tls --cafile $ORDERER_CA
#Exit docker container
docker exec -e "CORE_PEER_LOCALMSPID=Org3MSP" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.network.com/peers/peer0.org3.network.com/tls/ca.crt" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.network.com/users/Admin@org3.network.com/msp" -e "CORE_PEER_ADDRESS=peer0.org3.network.com:7051" -it cli bash
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/network.com/orderers/orderer.network.com/msp/tlscacerts/tlsca.network.com-cert.pem
peer channel join -b channelall.block --tls --cafile $ORDERER_CA
peer channel update -o orderer.network.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org3MSPanchors_channelall.tx --tls --cafile $ORDERER_CA





