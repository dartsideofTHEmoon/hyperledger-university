import * as React from 'react';
import Nav from "../../layout/components/Nav";
import Hero from "../../layout/components/Hero";
import "./DashboardPage.scss";
import {Redirect} from "react-router";
import isAuthenticated from "../../utils/isAuthenticated";
import {queryCertificates} from "../dashboardApi";
import {useEffect, useState} from "react";
import Footer from "../../layout/components/Footer";
import CertificateCard from "../components/CertificateCard";




interface DashboardPageProps {

}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {

    const [certificates, setCertificates] = useState<any[]>([])
    const [isLoading, toggleIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCertificates = async () => {
            const result = await queryCertificates()
            setCertificates(result.data.certificates)
            toggleIsLoading(false)
        }
        fetchCertificates()
    }, [])

    //This is simplified for demo purposes,
    //in real life we would like to have wrapper
    //validating user jwt token.
    if (!isAuthenticated()) return <Redirect to={`/`}/>

    if (isLoading) return null

    return (
        <React.Fragment>
            <Nav/>
            <section className="container-fluid">
                <Hero className={`px-3 py-2  mx-auto text-center dashboard-hero`}
                      title={`Certificates for approval`}
                      content={`New certificates waiting to be confirmed.`}/>
                    <div className="card-deck my-3 text-center">
                        {certificates && certificates.map((certificate:any) => {
                            return <CertificateCard certificate={certificate}/>
                        })}
                    </div>
                    <hr className="bg-white"/>
                <Hero className={`px-3 py-2  mx-auto text-center dashboard-hero`}
                      title={`Validated certificates`}
                      content={`New certificates waiting to be confirmed.`}/>
                <div className="card-deck my-3 text-center">
                    {certificates && certificates.map((certificate:any) => {
                        return <CertificateCard certificate={certificate}/>
                    })}
                </div>
                    <Footer/>
            </section>
        </React.Fragment>
    )
}

export default DashboardPage