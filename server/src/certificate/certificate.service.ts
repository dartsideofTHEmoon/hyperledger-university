import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common"
import {FabricService} from "../fabric/fabric.service"
import {
    UNIVERSITY_CERTIFICATE,
    UniversityCertificateAbi,
    UniversityCertificateProposalStatus
} from "./certificate.contract"

@Injectable()
export class CertificateService {

    private readonly logger = new Logger(CertificateService.name)

    constructor(
        private readonly fabricService: FabricService
    ) {
    }

    async listCertificateProposals() {
        try {
            const gateway = await this.fabricService.connectAsIdentity('notary2@example.com')
            const network = await gateway.getNetwork('mychannel')

            const contract = network.getContract(UNIVERSITY_CERTIFICATE)
            const certificateProposals = await contract.evaluateTransaction(UniversityCertificateAbi.queryCertificateProposalsByStatus, UniversityCertificateProposalStatus.TO_BE_VALIDATED)

            const parsedCertificateProposals = JSON.parse(certificateProposals.toString('utf8'))

            await this.fabricService.closeConnection()

            return parsedCertificateProposals

        } catch (e) {
            this.logger.error(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async attestCertificate() {
        try {
            const gateway = await this.fabricService.connectAsIdentity('notary2@example.com')
            const network = await gateway.getNetwork('mychannel')

            const contract = network.getContract(UNIVERSITY_CERTIFICATE)
            const certificateProposals = await contract.submitTransaction(UniversityCertificateAbi.attestCertificate, 'certProposal11', 'losowo')
            const parsedCertificateProposals = JSON.parse(certificateProposals.toString())
            await this.fabricService.closeConnection()
            return parsedCertificateProposals

        } catch (e) {
            this.logger.error(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
