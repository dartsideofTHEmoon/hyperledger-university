#!/usr/bin/env bash
docker exec cli peer chaincode install -n universityCertificate22 -v 0 -p /opt/gopath/src/github.com/universityCertificate/node -l "node"

docker exec cli peer chaincode instantiate -n universityCertificate22 -v 0 -C mychannel -l "node" -c '{"Args":[]}'

docker exec cli peer chaincode invoke -n universityCertificate5 -C mychannel -c '{"Args":["getCertificate", "certificate123"]}'

docker exec cli peer chaincode invoke -C mychannel -n universityCertificate22 -c '{"Args":["createCertificate","certificateId7","participantName", "universityId", "to_be_validated", "false", "timestamp", "notary2@example.com", "reporterId"]}'

docker exec cli peer chaincode query -C mychannel -n universityCertificate21 -c '{"Args":["queryCertificatesByNotaryId","notary2@example.com"]}'

docker exec cli peer chaincode invoke -C mychannel -n universityCertificate15 -c '{"Args":["initMarble","marble2","blue","35","tom"]}'

docker exec cli peer chaincode query -C mychannel -n universityCertificate15 -c '{"Args":["queryMarblesByOwner","tom"]}'

