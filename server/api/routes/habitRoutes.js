const router = require('express').Router();
const validation = require('../../validation/validation');

const Habit = require('../../models/habitModel');

//test route for api habit routes
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: Habit routes")
});

module.exports = router;