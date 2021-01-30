const User = require("../../models/userModel");
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
