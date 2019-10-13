export class UniversityCertificate {
    certificateId: string
    participantName: string
    universityId: string
    status: UniversityCertificateStatus
    isValidated: boolean
    reporterId: string
    notaryId: string
    timestamp: string


    constructor(certificateId: string, participantName: string, universityId: string, status: UniversityCertificateStatus, isValidated: boolean, reporterId: string, notaryId: string, timestamp: string) {
        this.certificateId = certificateId;
        this.participantName = participantName;
        this.universityId = universityId;
        this.status = status;
        this.isValidated = isValidated;
        this.reporterId = reporterId;
        this.notaryId = notaryId;
        this.timestamp = timestamp;
    }
}

export enum UniversityCertificateStatus {
    VALIDATED = 'validated',
    TO_BE_VALIDATED = 'to_be_validated',
    REJECTED = 'rejected'
}
