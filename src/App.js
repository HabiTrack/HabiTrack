import React, {useState, useEffect} from 'react';
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import UserContext from './contexts/userContext';

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

export default function App() {
  
  const [userData, setUserData] = useState({
    token: undefined, 
    user: undefined
  });

  //runs when the app is first loaded
  useEffect(() => {

    //have to define an async function inside the use effect since back-end using async
    const  checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      //if the token is not stored in the local storage, set the token as being empty.
      //this will allow the check for if the token is valid to return false rather than a server error
      if (token === null) {
          localStorage.setItem("auth-token", "");
          token="";
      }
      const tokenRes = await Axios.post(
          "http://localhost:5000/api/auth/validatetoken", 
          null, 
          { headers: {"Authorization": "Bearer " + token}}
      );
      
      //the data will contain a true / false from the backend endpoint
      if (tokenRes.data.isValid) {
          const userRes = await Axios.get(
              "http://localhost:5000/api/users/getbytoken",
              {headers: { "authorization": "Bearer " + token}}
          );

          //set the user data to the user that was retrieved
          setUserData({
              token,
              user: userRes.data.user,
          });
      } else {
        console.log("redirect the user to login");
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
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
    </UserContext.Provider>
  );
}
