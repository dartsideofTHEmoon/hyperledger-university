import {Context, Contract} from 'fabric-contract-api';
import {UniversityCertificate} from "./universityCertificate";

export class UniversityCertificateContract extends Contract {

    public async createCertificate(ctx: Context, certificateId: string, status: string, timestamp: string) {
        console.info('============= START : Create University Certificate ===========');

        if (!certificateId || !status || !timestamp) {
            throw new Error(`Missing creation params.`)
        }

        const certificate: UniversityCertificate = {
            certificateId,
            status,
            timestamp,
        };

        await ctx.stub.putState(certificateId, Buffer.from(JSON.stringify(certificate)));

        console.info('============= END : Create University Certificate ===========');
    }

    public async getCertificate(ctx: Context, certificateId: string): Promise<string> {
        const certificateAsBytes = await ctx.stub.getState(certificateId);
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            throw new Error(`${certificateId} does not exist.`);
        }
        console.log(certificateAsBytes.toString());
        return certificateAsBytes.toString();
    }
}