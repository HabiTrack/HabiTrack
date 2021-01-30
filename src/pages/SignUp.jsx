import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useHistory} from "react-router-dom"

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "../styles/login.css";

export default function SignUp() {

  const history = useHistory();
  const handleClickOpen = () => {};

  const handleSignUp = () => {
    history.push("/login");
  };

  return (

    <Box component="span" m={1}>
     <Grid container justify = "center">
      <FormControl component="fieldset">
          <FormLabel className="center fontSize" component="legend">Sign Up</FormLabel>
          <FormGroup>
            <TextField id="firstName" label="First Name" variant="outlined" />
            <TextField id="lastName" label="Last Name" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
            <TextField id="password" label="Password" variant="outlined" />
            <TextField id="confirmPassword" label="Confirm Password" variant="outlined" />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            onClick={handleClickOpen}
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
