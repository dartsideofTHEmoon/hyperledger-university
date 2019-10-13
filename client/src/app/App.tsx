import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LoginPage from "./login/containers/LoginPage";
import DashboardPage from "./dashboard/containers/DashboardPage";
import CertificatePage from "./certificate/containers/CertificatePage";

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/dashboard" component={DashboardPage}/>
                <Route exact path="/certificate/:id" component={CertificatePage}/>
            </Switch>
        </Router>
    )
}

const App: React.FC = () => {
    return (
        <div className="App">
            <AppRoutes/>
        </div>
    );
}

export default App;
