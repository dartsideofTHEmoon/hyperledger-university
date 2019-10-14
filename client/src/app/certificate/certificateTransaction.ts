import {apiWalletStore} from "../utils/apiStore";
import {sign} from "../utils/crypto";

export const createAttestCertificateProposal = async (certificateProposalId: string, certificateId: string) => {
    const certificate = apiWalletStore.get().certificate

    //check if user certificate exists

    const transactionProposal = {
        fcn: 'attestCertificate',
        args: [certificateProposalId, certificateId],
        chaincodeId: 'universityCertificate',
        channelId: 'mychannel',
    }

    return {transactionProposal, certificate}
}

export const signWithPrivateKey = (proposalBytes: any) => {
    const signature = sign(apiWalletStore.get().privateKey, proposalBytes, 'sha2', 256);
    const signedProposal = {signature, proposal_bytes: proposalBytes};
    return signedProposal;
}

