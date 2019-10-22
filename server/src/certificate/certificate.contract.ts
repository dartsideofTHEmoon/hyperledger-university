export enum UniversityCertificateAbi {
    createCertificateProposal = 'createCertificateProposal',
    queryCertificateProposalsByStatus = 'queryCertificateProposalsByStatus',
    attestCertificate = 'attestCertificate',
    queryCertificates = 'queryCertificates'
}

export enum UniversityCertificateProposalStatus {
    VALIDATED = "1",
    TO_BE_VALIDATED = "2",
    REJECTED = "3"
}

export enum UniversityCertificateStatus {
    ATTESTED = "1",
}

export const UNIVERSITY_CERTIFICATE = 'win10'
