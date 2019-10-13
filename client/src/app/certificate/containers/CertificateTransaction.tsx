import * as React from 'react';
import {createProposal, signWithPrivateKey} from "../certificateTransaction";
import {commitProposal, generateProposal, sendSignedProposal, sendSignedTransaction} from "../certificateApi";
import {useState} from "react";

interface CertificatePageProps {
    certificate: any
    isTransactionSubmitted: any
    transactionSubmitted: any
}

const CertificateTransaction: React.FC<CertificatePageProps> = (props) => {

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
        console.log(certificateValid    )
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
        props.isTransactionSubmitted(true)
    }

    return (
        <div className={`mt-2`}>
            {!props.transactionSubmitted && (certificateValid ? (<button type="button" className="mt-2 btn btn-lg btn-block btn-primary" onClick={executeTransaction}>Sign Certificate</button>) :
                (<button type="button" className="mt-2 btn btn-lg btn-block btn-primary" onClick={generateCertificateProposal}>Validate Certificate</button>))}
        </div>
    )
}

export default CertificateTransaction