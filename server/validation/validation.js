const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

/* 
Validates user registration data
Returns {errors(json object), isValid(bool)}
*/
exports.validateUserCreate = async (data) => {
    let errors = {};
    let isValid = true;

    // Check email
    if (!data.email) {
        errors.email = "Email field is required!";
        isValid = false;
    } 

    // Check if the email exists in the database
    if (data.email) {
        let existingUser = await User.findOne({email: data.email});
        if (existingUser) {
            errors.email = "Email already exists!";
                isValid = false;
        }
    }

    // Check if email is properly formatted
    if(data.email) {
        var format = /\S+@\S+\.\S+/;
        if(!format.test(data.email)) {
            errors.email = "Email is not properly formatted!";
            isValid = false;
        }
    }

    // Check first name
    if (!data.firstname) {
        errors.firstname = "First name field is required!";
        isValid = false;
    }

    // Check last name
    if (!data.lastname) {
        errors.lastname = "Last name field is required!";
        isValid = false;
    }

    // Check password
    if (!data.password) {
        errors.password = "Password field is required!";
        isValid = false;
    } else if (data.password.length < 6) {
        errors.password="Password must have at least 6 characters!";
        isValid = false;
    }

    // Check password check 
    if (!data.passwordCheck) {
        errors.passwordCheck = "Password check is required";
        isValid = false;
    }

    // Validate the password and password check match
    if ((data.passwordCheck && data.password) && data.password !== data.passwordCheck) {
        errors.passwordCheck = "The passwords do not match!";
        isValid = false;
    }

    // Return errors and isValid to calling function
    return {errors, isValid}
}

/* 
Validates login data
Returns {errors(json object), isValid(bool), user(json object)}
*/
exports.validateLogin = async (data) => {
    let errors = {};
    let isValid = true;
    let user = {};

    //validate the email is present
    if (!data.email) {
        errors.email = "Email cannot be empty";
        isValid = false;
    }

    //validate the password is present
    if (!data.password) {
        errors.pasword = "Password cannot be empty";
        isValid = false; 
    }

    //validate the email corresponds with a user object in the db
    if (data.email) {
        user = await User.findOne({email: data.email});
        if (!user) {
            errors.email = "Email does not correspond to a user account";
            isValid = false;
        }
    }

    //validate the password is valid
    if (data.password && user) {
        let isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            errors.password = "Incorrect password";
            isValid = false;
        }
    }

    //return
    return {errors, isValid, user};
}


