import Navbar from "./components/Navbar";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
