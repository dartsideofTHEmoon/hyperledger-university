#!/usr/bin/env bash
docker exec cli peer chaincode install -n universityCertificate4 -v 0 -p /opt/gopath/src/github.com/universityCertificate/node -l "node"

docker exec cli peer chaincode instantiate -n universityCertificate4 -v 0 -C mychannel -l "node" -c '{"Args":[]}'

docker exec cli peer chaincode invoke -C mychannel -n universityCertificate4 -c '{"Args":["createCertificateProposal", "certProposal10", "public_key","file_hash","org2.example.com"]}'
docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["createCertificateProposal", "certProposal2", "public_key","file_hash","org2.example.com"]}'
docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["createCertificateProposal", "certProposal3", "public_key","file_hash","org2.example.com"]}'
#docker exec cli peer chaincode invoke -C mychannel -n universityCertificate -c '{"Args":["attestCertificate", "certProposal3", "certificate1"]}'

docker exec cli peer chaincode query -C mychannel -n universityCertificate23 -c '{"Args":["queryCertificateProposals"]}'

docker exec cli peer chaincode invoke -C mychannel -n universityCertificate23 -c '{"Args":["attestCertificate", "certProposal0", "public_key"]}'
