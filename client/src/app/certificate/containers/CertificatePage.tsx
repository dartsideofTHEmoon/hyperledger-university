import * as React from 'react';
import {createProposal, signWithPrivateKey} from "../certificateTransaction";
import {commitProposal, generateProposal, sendSignedProposal, sendSignedTransaction} from "../certificateApi";
import {useState} from "react";

interface CertificatePageProps {
    certificate: any
}

const CertificatePage: React.FC<CertificatePageProps> = () => {

    const [proposal, setProposal] = useState<any>('')
    const [proposalResponses, setProposalResponses] = useState<any>('')
    const [certificateValid, isCertificateValid] = useState<boolean>(false)

    const generateCertificateProposal = async () => {
        const {transactionProposal, certificate} = await createProposal()
        const proposalResponse = await generateProposal(transactionProposal, certificate)
        setProposal(proposalResponse)
        const signedProposal = await signWithPrivateKey(Buffer.from(JSON.stringify(proposal)))
        const signedProposalResponses: any = await sendSignedProposal(signedProposal)

        //Here check if responses are valid
        isCertificateValid(true)
        setProposalResponses(signedProposalResponses.data.proposalResponse)
    }

    const executeTransaction = async () => {
        const commitReq = {
            proposalResponses: proposalResponses,
            proposal: proposal,
        }
        const commitResponse = await commitProposal(commitReq)
        const signedTransaction = await signWithPrivateKey(Buffer.from(JSON.stringify(commitResponse)))

        await sendSignedTransaction(commitReq, signedTransaction)

        //Here start listeners for transaction events to validate if transaction was successful
    }

    return (
        <div>
            <button onClick={generateCertificateProposal}>fff</button>
            {certificateValid && <button onClick={executeTransaction}>Sign Certificate</button>}
        </div>
    )
}

export default CertificatePage