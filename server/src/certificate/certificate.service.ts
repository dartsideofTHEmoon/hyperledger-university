import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {FabricService} from "../fabric/fabric.service";
import {UNIVERSITY_CERTIFICATE, UniversityCertificate} from "./certificate.contract";


@Injectable()
export class CertificateService {

    private readonly logger = new Logger(CertificateService.name)

    constructor(
        private readonly fabricService: FabricService
    ) {}

    async list() {
        try {
            const gateway = await this.fabricService.connectAsIdentity('notary3@example.com')
            const network = await gateway.getNetwork('mychannel');

            const contract = network.getContract(UNIVERSITY_CERTIFICATE);
            const certificate = await contract.evaluateTransaction(UniversityCertificate.getCertificate, 'certificate123')

            await this.fabricService.closeConnection()

            return certificate

        } catch (e) {
            this.logger.error(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}