import React, { useState } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "../styles/login.css";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  //states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState();
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { setUserData, setToken } = useAuth();

  const handleSignUp = () => {
    history.push("/signup");
  };

  const submit = async e => {
    e.preventDefault();
    try {
      //insert new user into the system
      const credentials = { email, password };
      const response = await Axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );

      //store the token in local storage
      localStorage.clear();
      localStorage.setItem("auth-token", response.data.token);

      const userRes = await Axios.get(
        "http://localhost:5000/api/users/getbytoken",
        { headers: { authorization: "Bearer " + response.data.token } }
      );

      //set user context
      setUserData(userRes.data.user);
      setToken(response.data.token);

      history.push("/");
    } catch (err) {
      setIsValid(err.response.data.isValid);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <Box component="span" m={1}>
      <Grid container justify="center">
        <FormControl component="fieldset">
          <FormLabel className="center fontSize" component="legend">
            Sign In
          </FormLabel>
          <FormGroup>
            {errors.email && <div className="redError">{errors.email}</div>}
            <TextField
              id="username"
              className="bottomMargin"
              label="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              variant="outlined"
            />
            {errors.password && (
              <div className="redError">{errors.password}</div>
            )}
            <TextField
              id="password"
              className="bottomMargin"
              label="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              variant="outlined"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            onClick={submit}
          >
            Sign In
          </Button>
          {/* Sign up link */}
          <Button onClick={handleSignUp} className="blueLink">
            Don't have an account? Sign Up
          </Button>
        </FormControl>
      </Grid>
    </Box>
  );
}
