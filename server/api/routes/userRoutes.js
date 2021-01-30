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
router.post("/create", async (req, res) => {
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
        res.status(200).json({user: newUser, isValid: isValid, errors: errors});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Update user information
router.post("/update", async (req, res) => {
    try {
        const {errors, isValid} = await validation.validateUserUpdate(req.body);

        if (!isValid) {
            return res.status(400).json({isValid: isValid, errors: errors});
        }

        let updates = {};

        if (req.body.firstname) {
            updates.firstname = req.body.firstname;
        }

        if (req.body.lastname) {
            updates.lastname = req.body.lastname;
        }

        if (req.body.email) {
            updates.email  = req.body.email;
        }

        if (req.body.password) {
            updates.password  = req.body.password;
        }

        await User.updateOne({_id: req.body.id}, updates);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;