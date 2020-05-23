//Modules
import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

//Pages
import { LandingPage, Login, Dashboard, NotFound } from './pages';

export default
    <Router>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </Router>;