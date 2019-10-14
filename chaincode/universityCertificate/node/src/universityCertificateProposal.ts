export class UniversityCertificateProposal {
    ownerId: string
    fileHash: string
    universityId: string
    status: UniversityCertificateProposalStatus
    timestamp: string

    constructor(ownerId: string, fileHash: string, universityId: string, status: UniversityCertificateProposalStatus, timestamp: string) {
        this.ownerId = ownerId;
        this.fileHash = fileHash;
        this.universityId = universityId;
        this.status = status;
        this.timestamp = timestamp;
    }
}

export enum UniversityCertificateProposalStatus {
    VALIDATED = 1,
    TO_BE_VALIDATED = 2,
    REJECTED = 3
}