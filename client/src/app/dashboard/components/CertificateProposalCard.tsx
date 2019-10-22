import * as React from 'react';
import {useState} from "react";
import Modal from 'react-modal';
import "./CertificateProposalCard.scss";
import CertificateProposalDetails from "../../certificate/components/CertificateProposalDetails";
import certificateImg from "../../../img/policy.png";

interface CertificateCardProps {
    certificateProposal: any
}

const CertificateProposalCard: React.FC<CertificateCardProps> = (props) => {
    const {ownerId, fileHash, universityId, status, timestamp} = props.certificateProposal.Record

    const [displayValidation, toggleDisplayValidation] = useState<boolean>(false)
    const [transactionSubmitted, isTransactionSubmitted] = useState<boolean>(false)


    const renderModal = () => {
        return (
            <Modal
                isOpen={displayValidation}
                onRequestClose={() => toggleDisplayValidation(false)}
                contentLabel="Example Modal"
                className={'dashboard__modal px-2'}
                overlayClassName={`dashboard__overlay`}
            >
                <CertificateProposalDetails
                    closeModal={() => toggleDisplayValidation(false)}
                    certificateProposal={props.certificateProposal}
                    isTransactionSubmitted={isTransactionSubmitted}
                    transactionSubmitted={transactionSubmitted}
                />

            </Modal>
        )
    }

    return (
        <div className={`card mb-4 shadow-sm ${transactionSubmitted && `border-success`}`}>
            <div className="card-header">
                <h2 className="my-0 font-weight-bold"> {props.certificateProposal.Key}</h2>
            </div>
            <div className="card-body ">
                <div className="d-flex flex-row">
                    <div className="col-6">
                        <img src={certificateImg} width="150"/>
                    </div>
                    <div className="col-6 text-left">
                        <h3 className="card-title pricing-card-title">{ownerId}</h3>
                        <h6>{universityId}</h6>

                        <h6 className="small">TO BE VALIDATED</h6>
                        <h6 className="mb-2"><small className="font-weight-bold">{ timestamp}</small></h6>
                    </div>
                </div>

                {!transactionSubmitted && <button type="button" className="mt-3 btn btn-lg btn-block btn-soft-danger"
                                                  onClick={() => toggleDisplayValidation(true)}>Attest certificate proposal</button>}
            </div>
            {displayValidation && renderModal()}
        </div>
    )
}

export default CertificateProposalCard