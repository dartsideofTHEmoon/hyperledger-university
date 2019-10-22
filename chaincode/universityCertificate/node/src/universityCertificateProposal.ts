export class UniversityCertificateProposal {
    ownerId: string
    fileHash: string
    universityId: string
    status: UniversityCertificateProposalStatus
    timestamp: string
    docType: string

    constructor(docType: string, ownerId: string, fileHash: string, universityId: string, status: UniversityCertificateProposalStatus, timestamp: string) {
        this.docType = docType;
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

export const UNIVERSITY_CERTIFICATE_PROPOSAL = 'universityCertificateProposal'
