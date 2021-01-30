import React, {useState} from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useHistory} from "react-router-dom"
import Axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "../styles/login.css";

export default function SignUp() {

  //states
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState(); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [isValid, setIsValid] = useState();
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSignUp = () => {
    history.push("/login");
  };

  //handle form submission
  const submit = async (e) => {
    e.preventDefault();

    try {
      //insert new user into the system
      const newUser = {firstname, lastname, email, password, passwordCheck};
      const response = await Axios.post(
        "http://localhost:5000/api/users/create",
        newUser
      );
      setIsValid(response.data.isValid);
      setErrors({});
    } catch (err) {
      setIsValid(err.response.data.isValid);
      setErrors(err.response.data.errors);
    }
  }

  return (

    <Box component="span" m={1}>
     <Grid container justify = "center">
      <FormControl component="fieldset">
          <FormLabel className="center fontSize" component="legend">Sign Up</FormLabel>
          {isValid === true && <p>User Registered Successfully</p>}
          {isValid === true && <div><Button onClicke={handleSignUp}>login</Button></div>}
          {isValid === false && <p>Registration failed</p>}
          <FormGroup>
            <TextField id="firstName" variant="outlined" label="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            {errors.firstname && <div>{errors.firstname}</div>}
            <TextField id="lastName" label="Last Name" variant="outlined" onChange={(e) => setLastName(e.target.value)}/>
            {errors.lastname && <div>{errors.lastname}</div>}
            <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
            {errors.email && <div>{errors.email}</div>}
            <TextField id="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && <div>{errors.password}</div>}
            <TextField id="confirmPassword" label="Confirm Password" variant="outlined" onChange={(e) => setPasswordCheck(e.target.value)}/>
            {errors.passwordCheck && <div>{errors.passwordCheck}</div>}
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            onClick={submit}
          >
            Sign Up
          </Button>
          {/* Sign up link */}
          <Button
            onClick={handleSignUp}
            className="blueLink"
          >
            Already have an account? Sign In
          </Button>
        
      </FormControl>
      </Grid>
    </Box>
  );
}
