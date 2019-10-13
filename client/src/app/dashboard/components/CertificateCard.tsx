import * as React from 'react';
import CertificatePage from "../../certificate/containers/CertificatePage";
import {useState} from "react";

interface CertificateCardProps {
    certificate: any
}

const CertificateCard: React.FC<CertificateCardProps> = (props) => {

    const {certificateId, participantName, reporterId, universityId, status, timestamp} = props.certificate.Record

    const [redirect, toggleRedirect] = useState<boolean>(false)


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header">
                <h2 className="my-0 font-weight-normal">Certificate - {certificateId}</h2>
            </div>
            <div className="card-body">
                <h3 className="card-title pricing-card-title">{participantName}</h3>
                <h5>{universityId}</h5>
                <h5>{reporterId}</h5>
                <h5>{status}</h5>
                <h5 className="mb-2">{timestamp}</h5>
                <button type="button" className="mt-2 btn btn-lg btn-block btn-primary" onClick={() => toggleRedirect(true)}>Validate certificate</button>
            </div>
            {redirect && <CertificatePage certificate={props.certificate}/>}
        </div>
    )
}

export default CertificateCard