export class UniversityCertificate {
    universityId: string
    fileHash: string
    ownerId: string
    timestamp: string
    docType: string
    status: UniversityCertificateStatus

    constructor(docType: string, status: UniversityCertificateStatus, universityId: string, fileHash: string, ownerId: string, timestamp: string) {
        this.docType = docType;
        this.status = status;
        this.universityId = universityId;
        this.ownerId = ownerId;
        this.fileHash = fileHash;
        this.timestamp = timestamp;
    }
}

export enum UniversityCertificateStatus {
    ATTESTED = 1,
}

export const UNIVERSITY_CERTIFICATE = 'universityCertificate'
