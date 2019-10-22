import * as React from 'react';
import CertificateNav from "./CertificateNav";
import CertificateProposalDetailsSidebar from "./CertificateProposalDetailsSidebar";
import {useState} from "react";
import {createAttestCertificateProposal, signWithPrivateKey} from "../certificateTransaction";
import {commitProposal, generateProposal, sendSignedProposal, sendSignedTransaction} from "../certificateApi";
import Modal from "react-modal";

interface CertificateProposalDetailsProps {
    closeModal: () => void
    certificateProposal: any
    isTransactionSubmitted: any
    transactionSubmitted: any
}

const CertificateProposalDetails: React.FC<CertificateProposalDetailsProps> = (props) => {

    const [proposal, setProposal] = useState<any>('')
    const [proposalResponses, setProposalResponses] = useState<any>('')
    const [certificateValid, isCertificateValid] = useState<boolean>(false)
    const [transactionInProgress, toggleTransactionInProgress] = useState<boolean>(false)
    const [transactionId, setTransactionId] = useState<any>('')

    const generateAttestCertificateProposal = async () => {
        const {transactionProposal, certificate} = await createAttestCertificateProposal(props.certificateProposal.Key, "certificateId")
        const proposalResponse = await generateProposal(transactionProposal, certificate)
        setProposal(proposalResponse)

        const signedProposal = await signWithPrivateKey(Buffer.from(JSON.stringify(proposal)))
        toggleTransactionInProgress(true)
        const signedProposalResponses: any = await sendSignedProposal(signedProposal)

        //Here check if responses are valid
        isCertificateValid(true)
        setProposalResponses(signedProposalResponses.data.proposalResponse)
        setTimeout(() => {
            toggleTransactionInProgress(false)
            setTransactionId(proposalResponse.data.unsignedProposal.txId._transaction_id)
        }, 1000)

    }

    const executeAttestCertificateTransaction = async () => {
        const commitReq = {
            proposalResponses: proposalResponses,
            proposal: proposal,
        }
        const commitResponse = await commitProposal(commitReq)
        const signedTransaction = await signWithPrivateKey(Buffer.from(JSON.stringify(commitResponse)))
        toggleTransactionInProgress(true)

        await sendSignedTransaction(commitReq, signedTransaction)

        //Here start listeners for transaction events to validate if transaction was successful

        props.isTransactionSubmitted(true)
        setTimeout(() => {
            toggleTransactionInProgress(false)
        }, 1000)
    }


    return (
        <React.Fragment>
            <CertificateNav closeModal={props.closeModal} certificateId={props.certificateProposal.Key}/>
            <div className="container-fluid container-application">
                <div className="main-content position-relative">
                    <div className="page-content">
                        <div className="row mt-3">
                            <CertificateProposalDetailsSidebar proposalStatus={'VALIDATED BY UNIVERSITY'}/>
                            <div className="col-lg-8 order-lg-1">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className=" h5 has-font-bold">Certificate Proposal Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Student ID</label>
                                                        <input className="form-control" disabled={true} type="text"
                                                               value={props.certificateProposal.Record.ownerId}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label">University ID</label>
                                                        <input className="form-control" disabled={true} type="text"
                                                               value={props.certificateProposal.Record.universityId}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Certificate hash</label>
                                                        <textarea rows={4} className="form-control" disabled={true}
                                                                  value={props.certificateProposal.Record.fileHash}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {!props.transactionSubmitted && !certificateValid && <div className="mt-4">
                                                <button type="button" onClick={generateAttestCertificateProposal}
                                                        className="btn btn-sm btn-soft-success rounded-pill">Validate
                                                    certificate
                                                </button>
                                            </div>}
                                        </form>
                                    </div>
                                </div>
                                {!props.transactionSubmitted && certificateValid &&
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className=" h6 mb-0">Attest validated certificate copy</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="small">TransactionId: <small className="font-weight-bold">{transactionId}</small></p>
                                        <button type="button" className="btn btn-sm btn-soft-danger rounded-pill"
                                                onClick={executeAttestCertificateTransaction}>
                                            Attest certificate copy
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {transactionInProgress && renderLoaderModal()}
        </React.Fragment>
    )
}

const renderLoaderModal = () => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => false}
            contentLabel="Example Modal"
            className={'loader__modal px-2'}
            overlayClassName={`dashboard__overlay`}
        >
            <div className={`d-flex flex-column h-100`}>
                <div className="my-auto">
                    <p className="h5 text-white">transaction in progress</p>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CertificateProposalDetails;