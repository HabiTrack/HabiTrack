import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useHistory} from "react-router-dom"

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import SignUp from "../pages/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "../styles/login.css";

export default function Login() {
  const history = useHistory();
  const handleClickOpen = () => {};

  const handleSignUp = () => {
    history.push("/signup");
  };

  return (

    <Box component="span" m={1}>
     <Grid container justify = "center">
      <FormControl component="fieldset">
          <FormLabel className="center fontSize" component="legend">Sign In</FormLabel>
          <FormGroup>
            <TextField id="username" label="username" variant="outlined" />
            <TextField id="password" label="password" variant="outlined" />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            onClick={handleClickOpen}
          >
            Sign In
          </Button>
          {/* Sign up link */}
          <Button
            onClick={handleSignUp}
            className="blueLink"
          >
            Don't have an account? Sign Up
          </Button>
        
      </FormControl>
      </Grid>
    </Box>
  );
}
