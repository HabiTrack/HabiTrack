const router = require('express').Router();
const validation = require('../../validation/validation');
const bcrypt = require('bcryptjs');

// User model
const User = require("../../models/user-model");

// Test route
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: User Routes");
});

router.post("/create", async (req, res)=> {
    try {
        // Validation


        // 
        const salt = await bcrypt.genSalt();
        const pswHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: pswHash,
            datecreated: Date.now(),
            dateupdated: Date.now()
        });

        // Save user schema to DB
        const savedUser = await newUser.save();
        return res.status(200).json({user: savedUser});
    } catch (err) {
        res.status(500).json({serverError: err.message, isValid: false});
    }
});