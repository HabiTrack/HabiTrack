import React from "react";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "./contexts/StoreContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Navbar></Navbar>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/admin" component={Admin} />
              <PrivateRoute path="/history" component={History} />
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
