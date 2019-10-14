import * as React from 'react';
import CertificateTransaction from "../../certificate/containers/CertificateTransaction";
import {useState} from "react";

interface CertificateCardProps {
    certificateProposal: any
}

const CertificateProposalCard: React.FC<CertificateCardProps> = (props) => {

    const {ownerId, fileHash,  universityId, status, timestamp} = props.certificateProposal.Record

    const [displayValidation, toggleDisplayValidation] = useState<boolean>(false)
    const [transactionSubmitted, isTransactionSubmitted] = useState<boolean>(false)

    return (
        <div className={`card mb-4 shadow-sm ${transactionSubmitted && `border-success`}`}>
            <div className="card-header">
                <h2 className="my-0 font-weight-normal">Certificate - {props.certificateProposal.Key}</h2>
            </div>
            <div className="card-body ">
                <h3 className="card-title pricing-card-title">{ownerId}</h3>
                <h5>{fileHash}</h5>
                <h5>{universityId}</h5>
                <h5 className="mb-2">{timestamp}</h5>
                {!transactionSubmitted && <button type="button" className="mt-2 btn btn-lg btn-block btn-primary" onClick={() => toggleDisplayValidation(true)}>Start Validation</button>}
                {displayValidation && <CertificateTransaction certificateProposal={props.certificateProposal} isTransactionSubmitted={isTransactionSubmitted} transactionSubmitted={transactionSubmitted}/>}
            </div>
        </div>
    )
}

export default CertificateProposalCard