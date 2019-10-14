export class UniversityCertificate {
    universityId: string
    fileHash: string
    ownerId: string
    timestamp: string

    constructor(universityId: string, fileHash: string, ownerId: string, timestamp: string) {
        this.universityId = universityId;
        this.ownerId = ownerId;
        this.fileHash = fileHash;
        this.timestamp = timestamp;
    }
}

