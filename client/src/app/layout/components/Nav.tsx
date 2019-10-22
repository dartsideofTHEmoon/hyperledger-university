import * as React from 'react';
import {apiTokenStore, apiUserStore, apiWalletStore} from "../../utils/apiStore";

interface NavProps {}

const Nav: React.FC<NavProps> = (props) => {

    const logOut = () => {
        apiWalletStore.clear()
        apiTokenStore.clear()
        apiUserStore.clear()
    }

    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4  bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">ELM demo</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark font-weight-bold" href="#">notary@example.com</a>
            </nav>
            <a className="btn btn-outline-primary" href="#" onClick={logOut}>Log out</a>
        </div>
    )
}

export default Nav