import {Controller, Get, Post, Res} from '@nestjs/common';
import {Response} from "express";
import {ValidBody} from "../utils/valid.body";
import {GenerateCertificateProposal, SendSignedCertificateProposal} from "../../dist/certificate/certificate.dto";
import {SendProposalCommit, SendSignedTransaction} from "./fabric.dto";
import {FabricService} from "./fabric.service";

@Controller("api/fabric")
export class FabricController {
    constructor(
        private readonly fabricService: FabricService
    ) {}
    
    @Post('/proposal')
    async generateUnsignedProposal(
        @Res() response: Response,
        @ValidBody() generateTransactionProposal: GenerateCertificateProposal
    ) {
        const {transactionProposal, certificate} = generateTransactionProposal

        const unsignedProposal = await this.fabricService.generateUnsignedProposal(transactionProposal, certificate)

        response.send({unsignedProposal})
    }

    @Post('/signed-proposal')
    async sendSignedProposal(
        @Res() response: Response,
        @ValidBody() sendSignedCertificateProposal: SendSignedCertificateProposal
    ) {
        const {signedProposal} = sendSignedCertificateProposal

        const proposalResponse = await this.fabricService.sendSignedTransactionProposal(signedProposal)

        response.send({proposalResponse})
    }


    @Post('/proposal/commit')
    async generateUnsignedTransaction(
        @Res() response: Response,
        @ValidBody() sendProposalCommit: SendProposalCommit
    ) {
        const {commit} = sendProposalCommit

        const commitProposal = await this.fabricService.commitProposal(commit)

        response.send({commitProposal})
    }

    @Post('/transaction/execute')
    async sendSignedTransaction(
        @Res() response: Response,
        @ValidBody() sendSignedTransaction: SendSignedTransaction
    ) {
        const {request, signedTransaction} = sendSignedTransaction

        const proposalResponse = await this.fabricService.sendSignedTransaction(request, signedTransaction)

        response.send({proposalResponse})
    }
}
