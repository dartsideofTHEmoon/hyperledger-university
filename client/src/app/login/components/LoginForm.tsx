import * as React from 'react';
import "./LoginForm.scss";
import {HttpResponse, HttpStatus} from "../../utils/api";
import {useState} from "react";
import {useInput} from "../../utils/input";
import {apiTokenStore, apiUserStore, apiWalletStore} from "../../utils/apiStore";
import {Redirect} from "react-router";

interface LoginFormProps {
    login: (email: string, password: string) => Promise<HttpResponse>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

    const [email, emailInput] = useInput("email", "email", "email")
    const [password, passwordInput] = useInput("password", "password", "password")
    const [loginError, setLoginError] = useState<string>("")
    const [redirect, toggleRedirect] = useState<boolean>(false)


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!email && !password) return null

        const response = await props.login(email as string, password as string)

        if (response && response.status === HttpStatus.OK) {
            apiTokenStore.set(response.data.token)
            apiUserStore.set(response.data.user)
            apiWalletStore.set(response.data.identity)
            return toggleRedirect(true)
        }
        return setLoginError("Wrong credentials or error during login process.")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="form-control-label">Email</label>
            <div className="input-group form-group">
                {emailInput}
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <label className="form-control-label">Password</label>
                <div className="mb-2">
                    <a href="#!"
                       className="small text-muted text-underline--dashed border-primary">Lost
                        password?</a>
                </div>
            </div>
            <div className="input-group form-group">
                {passwordInput}
            </div>
            <div className="form-group">
                <button type="submit"
                        className="btn btn-sm btn-primary btn-icon rounded-pill">
                    <span className="btn-inner--text">Sign in</span>
                    <span className="btn-inner--icon"><i
                        className="fas fa-long-arrow-alt-right"/></span>
                </button>
            </div>
            {loginError && <p className="text-danger">{loginError}</p>}
            {redirect && <Redirect to={`/dashboard`}/>}
        </form>
    )
}

export default LoginForm