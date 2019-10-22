import * as React from 'react';
import LoginForm from "../components/LoginForm";
import {loginApi} from "../loginApi";
import "./LoginPage.scss";

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = (props) => {
    return (
        <div className="min-vh-100 py-5 d-flex align-items-center">
            <div className="row justify-content-center w-100">
                <div className=" col-lg-4 card shadow zindex-100 mb-0">
                    <div className="card-body px-md-5 py-5">
                        <h6 className="h3">Login</h6>
                        <p className="text-muted mb-5">Sign in to your account to continue.</p>
                        <LoginForm login={loginApi}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage