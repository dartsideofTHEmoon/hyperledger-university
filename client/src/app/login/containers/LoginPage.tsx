import * as React from 'react';
import LoginForm from "../components/LoginForm";
import {loginApi} from "../loginApi";

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = (props) => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center is-100-height">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-white">Sign In</h3>
                    </div>
                    <div className="card-body">
                        <LoginForm login={loginApi}/>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center text-white">
                        ELM demo application
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage