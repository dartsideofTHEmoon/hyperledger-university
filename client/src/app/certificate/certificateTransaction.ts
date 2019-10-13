import {apiWalletStore} from "../utils/apiStore";
import {sign} from "../utils/crypto";


export const createProposal = async () => {
    const certificate = apiWalletStore.get().certificate

    const transactionProposal = {
        fcn: 'createCertificate',
        args: ["certificateId22", "participantName", "universityId", "to_be_validated", "false", "timestamp", "notary2@example.com", "reporterId"],
        chaincodeId: 'universityCertificate22',
        channelId: 'mychannel',
    }

    return {transactionProposal, certificate}
}

export const signWithPrivateKey = (proposalBytes: any) => {
    const signature = sign(apiWalletStore.get().privateKey, proposalBytes, 'sha2', 256);
    const signedProposal = {signature, proposal_bytes: proposalBytes};
    return signedProposal;
}

