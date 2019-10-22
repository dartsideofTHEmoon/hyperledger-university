#!/usr/bin/env bash
docker exec cli peer chaincode install -n win10 -v 1 -p /opt/gopath/src/github.com/universityCertificate/node -l "node"

docker exec cli peer chaincode instantiate -n win10 -v 1 -C mychannel -l "node" -c '{"Args":[]}'

docker exec cli peer chaincode invoke -C mychannel -n win10 -c '{"Args":["createCertificateProposal", "certProposal13", "public_key","file_hash","org2.example.com"]}'
docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["createCertificateProposal", "certProposal2", "public_key","file_hash","org2.example.com"]}'
docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["createCertificateProposal", "certProposal3", "public_key","file_hash","org2.example.com"]}'
#docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["attestCertificate", "certProposal3", "certificate1"]}'

docker exec cli peer chaincode query -C mychannel -n win10 -c '{"Args":["queryCertificateProposalsByStatus", "2"]}'
docker exec cli peer chaincode query -C mychannel -n win10 -c '{"Args":["queryCertificates"]}'


docker exec cli peer chaincode invoke -C mychannel -n win10 -c '{"Args":["attestCertificate", "certProposal10", "cert1"]}'
