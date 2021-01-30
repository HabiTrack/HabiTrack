const router = require('express').Router();
const jwt = require("jsonwebtoken");
const validation = require('../../validation/validation');

const User = require("../../models/userModel");

//test route for the api user router
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: Authentication routes");
});

module.exports = router;