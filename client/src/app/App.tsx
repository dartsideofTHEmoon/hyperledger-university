import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LoginPage from "./login/containers/LoginPage";
import DashboardPage from "./dashboard/containers/DashboardPage";

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/dashboard" component={DashboardPage}/>
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
