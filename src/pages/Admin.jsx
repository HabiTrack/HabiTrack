import React, {useState} from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "../styles/login.css";

export default function Admin() {
    //states
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [isValid, setIsValid] = useState();
    const [errors, setErrors] = useState({});

    const submit = async (e) => {
        e.preventDefault();
        let id="60166142146a931714e03f3b";
        try {
            const updateUser = {id, firstname, lastname, email, password, passwordCheck};
            const response = await Axios.post(
                "https://habitrack8.herokuapp.com/api/users/update",
                updateUser
            );
            console.log(response);
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
                    <FormLabel className="center fontSize" component="legend">Update Profile</FormLabel>
                    {isValid === true && <div className="biggerGreen">Profile updated successfully!</div>}
                    {isValid === false && <div className="biggerRed"><u>Profile update failed!</u></div>}
                <FormGroup>
                    {errors.firstname && <div className="redError">{errors.firstname}</div>}
                    <TextField id="firstName" className="bottomMargin" variant="outlined" label="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                    {errors.lastname && <div className="redError">{errors.lastname}</div>}
                    <TextField id="lastName" className="bottomMargin" label="Last Name" variant="outlined" onChange={(e) => setLastName(e.target.value)}/>
                    {errors.email && <div className="redError">{errors.email}</div>}
                    <TextField id="email" className="bottomMargin" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                    {errors.password && <div className="redError">{errors.password}</div>}
                    <TextField id="password" className="bottomMargin" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
                    {errors.passwordCheck && <div className="redError">{errors.passwordCheck}</div>}
                    <TextField id="confirmPassword" className="bottomMargin" label="Confirm Password" variant="outlined" onChange={(e) => setPasswordCheck(e.target.value)}/>
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    className="mr-2"
                    onClick={submit}
                >
                    Update profile
                </Button>
            </FormControl>
        </Grid>
    </Box>
    );
}
