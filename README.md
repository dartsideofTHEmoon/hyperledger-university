# Solution for university certificate

## Problem

The student wants to present a notarized copy of the certificate issued by his university.
Nowadays, this process is time consuming and can be simplified by using blockchain technology.

## Solution

The system consists of three participants: `student`, `notary` and `university`. 


1. A student in a web application, submits an application for the creation of a digital copy of the certificate, passes the hash of the certificate file and  name of the university.

2. The certificate proposal is saved in chaincode, the notary is informed about the copy of the certificate for approval.

3. Notary after logging into the system gets certificate copies to be verified and sends an offline request (signed in the browser) to the chaincode on the peer of the relevant university.

4. Chaincode verifies that the hash of the file matches the hash of the original certificate file found on a separate chaincode of the given university, and returns information about the accuracy of the given data.

5. If the copy of the certificate is verified, the notary public signs the transaction that creates a copy of the certificate in chaincode with his private key and sends to the orderer, which broadcast information over the network.

6. The student may use a notarized copy of the certificate.

## Assumptions and code explanation

These assumptions are intended to ensure the operation of the application, they are used only for the needs of this demo (in the production version we would have decided on other solutions).

1. A middleware has been created that generates admin idientity on the server and checks its existence with every request.
```
notary/server/src/fabric/adminExists.middleware.ts
```

2. When logging in, the user creates / gets an identity that is stored on the server and also returned to the browser and saved in local storage.
 
    This is to show the execution of offline requests in the web browser and queries to the hyperledger using the identity stored on server.
    
```
notary/server/src/certificate/certificate.service.ts
```

```
notary/client/src/app/certificate/containers/CertificateTransaction.tsx
```
3. Hyperledger network consists of only one organization, ultimately we would like to have an organization for each role in the network.

4. The certificate creation transaction is signed in the web app and sent to the server where it is sent to the appropriate peer, which allows us to track the changes of the certificate in the system database.

```
notary/server/src/fabric/fabric.service.ts
```

5. Certificates for ca, peers were created using the cryptogen tool, and deliberately placed in the repository.

6. In the application some of the data is hardcoded and the correct types are missing for some classes / objects, this is due to the limited time to complete the task.
 

## Network

```bash
# network
$ ./start.sh

$ docker-compose up -d cli

# install chaincode - execute commands from file one by one
$ ./installChaincode
```

## Database

```bash
# Project root
$ docker-compose up

# Add user to database
$ INSERT INTO public.users (id, email, password) VALUES ('64dd1b13-2794-43f7-9252-1c81bfd3b79d', 'notary2@example.com', 'password');

```

## Server

```bash
# server
$ nvm use
$ npm install
$ npm run start

# migrations 
$ npm run database:migrate
```
## Client

```bash
# client
$ nvm use
$ npm install
$ npm run start
```

