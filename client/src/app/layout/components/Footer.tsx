import * as React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <footer className="pt-4 my-md-5 pt-md-5 border-top fixed-bottom">
            <div className="row">
                <div className="col-12 col-md">
                    <small className="d-block mb-3 text-muted">&copy; 2017-2019</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Features</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="#">Cool stuff</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Resources</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="#">Resource</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>About</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="#">Team</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer