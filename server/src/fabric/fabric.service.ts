import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {FileSystemWallet, Gateway, Identity, Wallet, X509WalletMixin} from "fabric-network";
import * as path from "path";
import * as fs from "fs";
import FabricCAServices from "fabric-ca-client";
import Client, {Proposal} from "fabric-client";

@Injectable()
export class FabricService {

    private readonly connectionProfile: any
    private readonly connectionProfilePath: string
    readonly wallet: Wallet

    constructor(
        @Inject('FabricGateway') private readonly fabricGateway: Gateway
    ) {
        this.connectionProfilePath = path.resolve(path.join(__dirname, '..', '..'), 'connection.json')
        this.connectionProfile = JSON.parse(fs.readFileSync(this.connectionProfilePath, 'utf8'))
        this.wallet = new FileSystemWallet(path.join(process.cwd(), 'wallet'))
    }

    async identityExists(identityName): Promise<boolean> {
        return !!await this.wallet.exists(identityName)
    }

    async connectAsIdentity(identityName: string): Promise<Gateway> {
        if (!this.identityExists(identityName)) {
            throw new Error(`${identityName} identity does not exists.`)
        }

        const connectionOptions = {
            wallet: this.wallet,
            identity: identityName,
            discovery: {enabled: false}
        }

        await this.fabricGateway.connect(this.connectionProfile, connectionOptions);
        return this.fabricGateway
    }

    /**
     * Assertion that we are using default channel "mychannel", default orderer, and university organisation peer,
     * in real life we would like to take those params from configuration files or client requests depends on business needs
     */
    async configureDefaultChannel() {
        const mspId = 'Org1MSP'
        const channelId = 'mychannel'
        const client = new Client()
        const channel = client.newChannel(channelId)

        const peer = client.newPeer('grpc://localhost:7051')

        const orderer = client.newOrderer('grpc://localhost:7050')

        channel.addPeer(peer, mspId)
        channel.addOrderer(orderer)
        return {channel, peer}
    }

    async createIdentity(email: string, role: string, affiliation: string): Promise<Identity> {
        try {
            if (await this.identityExists(email)) {
                console.warn(`${email} identity exists.`)
                return await this.wallet.export(email)
            }

            await this.connectAsIdentity('admin')
            const ca = this.fabricGateway.getClient().getCertificateAuthority();
            const adminIdentity = this.fabricGateway.getCurrentIdentity();

            const secret = await ca.register({affiliation, enrollmentID: email, role}, adminIdentity)
            const enrollment = await ca.enroll({enrollmentID: email, enrollmentSecret: secret})

            const identity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
            await this.wallet.import(email, identity)
            console.log(`${email} identity successfully imported.`)

            await this.closeConnection()
            return identity
        } catch (e) {
            console.warn(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createAdminIdentity(): Promise<void> {
        try {
            const caURL = this.connectionProfile.certificateAuthorities['ca.example.com'].url
            const ca = new FabricCAServices(caURL)

            if (await this.identityExists('admin')) {
                console.warn(`Admin identity exists.`)
                return
            }
            //Params should be taken from outside of application (AWS sms etc.)
            const enrollment = await ca.enroll({enrollmentID: 'admin', enrollmentSecret: 'adminpw'});
            const identity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
            await this.wallet.import('admin', identity)
            console.log(`Admin identity successfully imported.`)

            await this.closeConnection()
        } catch (e) {
            console.warn(e.message)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async generateUnsignedProposal(transactionProposal, certificate) {
        try {
            const {channel} = await this.configureDefaultChannel()

            const proposal: Proposal = await channel.generateUnsignedProposal(transactionProposal, 'Org1MSP', certificate, false)
            console.log(proposal)
            channel.close()
            return proposal
        } catch (e) {
            console.log(e)
        }
    }

    async sendSignedTransactionProposal(signedProposal: any) {
        try {
            const {channel, peer} = await this.configureDefaultChannel()

            const targets = [peer]
            const sendSignedProposalReq = {signedProposal, targets}
            const result = await channel.sendSignedProposal(sendSignedProposalReq)
            channel.close()
            return result
        } catch (e) {
            console.log(e)
        }
    }

    async commitProposal(commit: any) {
        try {
            const {channel} = await this.configureDefaultChannel()

            const result = await channel.generateUnsignedTransaction(commit);
            channel.close()
            return result
        } catch (e) {
            console.log(e)
        }
    }

    async sendSignedTransaction(request: any, signedTransaction: any) {
        try {
            const {channel} = await this.configureDefaultChannel()

            const result = await channel.sendSignedTransaction(signedTransaction, request);
            channel.close()
            return result
        } catch (e) {
            console.log(e)
        }
    }

    async closeConnection(): Promise<void> {
        await this.fabricGateway.disconnect()
    }
}