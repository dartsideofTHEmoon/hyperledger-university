import * as React from 'react';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className="footer mx-5 fixed-bottom" id="footer-main">
            <div className="row text-center text-sm-left align-items-sm-center">
                <div className="col-sm-6">
                    <p className="text-sm mb-0">© 2019 ELM demo. All rights
                        reserved.</p>
                </div>
                <div className="col-sm-6 mb-md-0">
                    <ul className="nav justify-content-center justify-content-md-end">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Support</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Terms</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pr-0" href="#">Privacy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer