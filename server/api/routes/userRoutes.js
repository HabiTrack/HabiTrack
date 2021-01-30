const router = require('express').Router();
const validation = require('../../validation/validation');
const bcrypt = require('bcryptjs');

// User model
const User = require("../../models/userModel");

// Test route
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: User Routes");
});

// Create a new user
router.post("/create", async (req, res)=> {
    try {
        // Validation
        const {errors, isValid} = await validation.validateUserCreate(req.body);
        if (!isValid) {
            return res.status(400).json({user: {}, isValid: isValid, errors: errors});
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const pswHash = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: pswHash
        });

        // Save user schema to DB
        const savedUser = await newUser.save();
        return res.status(200).json({user: newUser, isValid: isValid, errors: errors});
    } catch (err) {
        res.status(500).json({serverError: err.message, isValid: false});
    }
});

module.exports = router;