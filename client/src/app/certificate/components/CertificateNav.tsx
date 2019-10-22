import * as React from 'react';

interface CertificateNavProps {
    closeModal: () => void
    certificateId: string
}

const CertificateNav: React.FC<CertificateNavProps> = (props) => {
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4  bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Attest certificate proposal -
                <span className="font-weight-bold">{props.certificateId}</span>
            </h5>
            <a className="btn btn-outline-primary" href="#" onClick={props.closeModal}>Close</a>
        </div>
    )
}

export default CertificateNav