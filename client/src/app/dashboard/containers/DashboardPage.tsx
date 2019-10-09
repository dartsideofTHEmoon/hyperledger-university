import * as React from 'react';
import Nav from "../../layout/components/Nav";
import Hero from "../../layout/components/Hero";
import "./DashboardPage.scss";
import {apiTokenStore} from "../../utils/apiStore";
import {Redirect} from "react-router";
import isAuthenticated from "../../utils/isAuthenticated";
import {useEffect} from "react";

interface DashboardPageProps {

}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {

    //This is simplified for demo purposes,
    //in real life we would like to have wrapper
    //validating user jwt token.
    if (!isAuthenticated()) return <Redirect to={`/`}/>

    return (
        <React.Fragment>
            <Nav/>
            <section className="container-fluid">
                <Hero className={`px-3 py-2  mx-auto text-center dashboard-hero`}
                      title={`certificates for approval`}
                      content={`New certificates waiting to be confirmed.`}/>

                <div className="container-fluid">
                    <div className="card-deck my-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Free</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/
                                    mo</small>
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>10 users included</li>
                                    <li>2 GB of storage</li>
                                    <li>Email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for
                                    free
                                </button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Pro</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$15 <small className="text-muted">/
                                    mo</small>
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>20 users included</li>
                                    <li>10 GB of storage</li>
                                    <li>Priority email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Enterprise</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$29 <small className="text-muted">/
                                    mo</small>
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>30 users included</li>
                                    <li>15 GB of storage</li>
                                    <li>Phone and email support</li>
                                    <li>Help center access</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Contact us</button>
                            </div>
                        </div>
                    </div>
                    <Hero className={`px-3 py-2  mx-auto text-center dashboard-hero`}
                          title={`certificates for approval`}
                          content={`New certificates waiting to be confirmed.`}/>

                    <footer className="pt-4 my-md-5 pt-md-5 border-top">
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
                </div>
            </section>
        </React.Fragment>
    )
}

export default DashboardPage