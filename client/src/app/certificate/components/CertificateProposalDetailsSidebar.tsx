import * as React from 'react';

interface CertificateProposalDetailsSidebarProps {
    proposalStatus: string
}

const CertificateProposalDetailsSidebar: React.FC<CertificateProposalDetailsSidebarProps> = (props) => {
    return (
        <div className="col-lg-4 order-lg-2">
            <div className="card">
                <div className="list-group list-group-flush">
                    <div className="list-group-item active">
                        <div className="media">
                            <i className="fas fa-user"/>
                            <div className="media-body ml-3">
                                <a href="settings.html"
                                   className="stretched-link h6 mb-1">Status</a>
                                <p className="mb-0 text-sm text-success">{props.proposalStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <i className="fas fa-map-marker-alt"/>
                            <div className="media-body ml-3">
                                <a href="addresses.html"
                                   className="stretched-link h6 mb-1">Addresses</a>
                                <p className="mb-0 text-sm">Faster checkout with saved addresses</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <i className="fas fa-credit-card"/>
                            <div className="media-body ml-3">
                                <a href="billing.html"
                                   className="stretched-link h6 mb-1">Billing</a>
                                <p className="mb-0 text-sm">Speed up your shopping experience</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <i className="fas fa-file-invoice"/>
                            <div className="media-body ml-3">
                                <a href="payment-history.html" className="stretched-link h6 mb-1">Payment
                                    history</a>
                                <p className="mb-0 text-sm">See previous orders and invoices</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <i className="fas fa-bell"/>
                            <div className="media-body ml-3">
                                <a href="notifications.html"
                                   className="stretched-link h6 mb-1">Notifications</a>
                                <p className="mb-0 text-sm">Choose what notification you will
                                    receive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificateProposalDetailsSidebar