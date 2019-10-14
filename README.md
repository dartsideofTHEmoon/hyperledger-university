#Solution for university certificate

## Problem

The student wants to present a notarized copy of the certificate issued by his university.
Nowadays, this process is time consuming and can be simplified by using blockchain technology.

## Solution

The system consists of three participants: `student`, `notary` and `university`. 


1. A student in a web application, submits an application for the creation of a digital copy of the certificate, passes the hash of the certificate file and  name of the university.

2. The certificate proposal is saved in chaincode, the notary is informed about the copy of the certificate for approval.

3. Notary after logging into the system gets certificate copies to be verified and sends an offline request (signed in the browser) to the chaincode on the peer of the relevant university.

4. Chaincode verifies that the hash of the file matches the hash of the original certificate file found on a separate chaincode of the given university, and returns information about the accuracy of the given data.

5. If the copy of the certificate is verified, the notary public signs the transaction with his private key and sends to the orderer, which broadcast information over the network.

## Test

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
