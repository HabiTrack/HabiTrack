const router = require('express').Router();
const jwt = require("jsonwebtoken");
const validation = require('../../validation/validation');
const tokenauth = require('../../middleware/tokenauth');

const User = require("../../models/userModel");

//test route for the api user router
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: Authentication routes");
});

//login route
router.post("/login", async (req, res)=> {
    try {
        //validate fields
        const {errors, isValid, user} = await validation.validateLogin(req.body);
        //if fields are not valid, send error back with error messages
        if (!isValid) {
            return res.status(400).json({errors: errors, isValid: isValid});
        }

        //generate the JWT, the payload is the user object that is found
        let token = jwt.sign({_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email}, process.env.JWT_SECRET);

        //return the user with the token
        return res.status(200).json({isValid: isValid, token, user: {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email}});
    } catch (err) {
        res.status(500).json({serverError: err.message, isValid: false});
    }
    res.sendStatus(200);
});

//validate token valid route
router.post("/validatetoken", tokenauth.verifyToken, (req, res) => {
    return res.status(200).json({isValid: true});
});  

module.exports = router;