export interface UniversityCertificate {
    certificateId: string
    participantName: string
    universityId: string
    status: UniversityCertificateStatus
    isValidated: boolean
    timestamp: string
    validationContract: UniversityCertificateValidationContract
}

export enum UniversityCertificateStatus {
    VALIDATED = 'validated',
    TO_BE_VALIDATED = 'to_be_validated',
    REJECTED = 'rejected'
}

export interface UniversityCertificateValidationContract {
    notaryId: string
    universityId: string
    reporterId: string
}