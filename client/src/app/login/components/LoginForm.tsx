import * as React from 'react';
import "./LoginForm.scss";
import {HttpResponse, HttpStatus} from "../../utils/api";
import {useState} from "react";
import {useInput} from "../../utils/input";
import {apiTokenStore, apiUserStore, apiWalletStore} from "../../utils/apiStore";
import {Redirect} from "react-router";
import {InMemoryWallet} from "fabric-network";

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
            //const wallet = new InMemoryWallet()
            //await wallet.import(email as string, response.data.identity)
            //console.log(wallet)
            apiWalletStore.set(response.data.identity)
            return toggleRedirect(true)
        }
        return setLoginError("Wrong credentials or error during login process.")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                {emailInput}
            </div>
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                {passwordInput}
            </div>
            <div className="form-group">
                <input type="submit" value="Login" className="btn float-right login-btn"/>
            </div>
            {loginError && <p className="text-danger">{loginError}</p>}
            {redirect && <Redirect to={`/dashboard`}/>}
        </form>
    )
}

export default LoginForm