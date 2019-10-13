import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common"
import {FabricService} from "../fabric/fabric.service"
import {UNIVERSITY_CERTIFICATE, UniversityCertificateAbi} from "./certificate.contract"
import Client, {Proposal} from 'fabric-client'

@Injectable()
export class CertificateService {

    private readonly logger = new Logger(CertificateService.name)

    constructor(
        private readonly fabricService: FabricService
    ) {}

    async list() {
        try {
            const gateway = await this.fabricService.connectAsIdentity('notary2@example.com')
            const network = await gateway.getNetwork('mychannel')

            const contract = network.getContract(UNIVERSITY_CERTIFICATE)
            const certificate = await contract.evaluateTransaction(UniversityCertificateAbi.queryCertificatesByNotaryId, 'notary2@example.com')

            const parsedCertificates = JSON.parse(certificate.toString('utf8'))

            await this.fabricService.closeConnection()

            return parsedCertificates

        } catch (e) {
            this.logger.error(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}