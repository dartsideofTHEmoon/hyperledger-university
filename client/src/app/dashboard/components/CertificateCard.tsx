import * as React from 'react';
import CertificateTransaction from "../../certificate/containers/CertificateTransaction";
import {useState} from "react";

interface CertificateCardProps {
    certificate: any
}

const CertificateCard: React.FC<CertificateCardProps> = (props) => {

    const {certificateId, participantName, reporterId, universityId, status, timestamp} = props.certificate.Record

    const [displayValidation, toggleDisplayValidation] = useState<boolean>(false)
    const [transactionSubmitted, isTransactionSubmitted] = useState<boolean>(false)

    return (
        <div className={`card mb-4 shadow-sm ${transactionSubmitted && `border-success`}`}>
            <div className="card-header">
                <h2 className="my-0 font-weight-normal">Certificate - {certificateId}</h2>
            </div>
            <div className="card-body ">
                <h3 className="card-title pricing-card-title">{participantName}</h3>
                <h5>{universityId}</h5>
                <h5>{reporterId}</h5>
                <h5>{status}</h5>
                <h5 className="mb-2">{timestamp}</h5>
                {!transactionSubmitted && <button type="button" className="mt-2 btn btn-lg btn-block btn-primary" onClick={() => toggleDisplayValidation(true)}>Start Validation</button>}
                {displayValidation && <CertificateTransaction certificate={props.certificate} isTransactionSubmitted={isTransactionSubmitted} transactionSubmitted={transactionSubmitted}/>}
            </div>
        </div>
    )
}

export default CertificateCard