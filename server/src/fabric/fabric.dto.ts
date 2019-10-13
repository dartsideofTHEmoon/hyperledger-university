import {IsDefined} from "class-validator";

export class GenerateProposal {

    constructor(transactionProposal: string, certificate: string) {
        this.transactionProposal = transactionProposal
        this.certificate = certificate
    }

    @IsDefined()
    readonly transactionProposal: string

    @IsDefined()
    readonly certificate: string
}

export class SendSignedProposal {

    constructor(signedProposal: string) {
        this.signedProposal = signedProposal
    }

    @IsDefined()
    readonly signedProposal: string
}

export class SendProposalCommit {

    constructor(commit: string) {
        this.commit = commit
    }

    @IsDefined()
    readonly commit: string
}

export class SendSignedTransaction {

    constructor(signedTransaction: string, request: string) {
        this.signedTransaction = signedTransaction
        this.request = request
    }

    @IsDefined()
    readonly signedTransaction: string

    @IsDefined()
    readonly request: string

}