const router = require('express').Router();
const validation = require('../../validation/validation');
const tokenauth = require('../../middleware/tokenauth');

const Routine = require('../../models/habitModel');

//test route for api habit routes
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: Habit routes")
});

//route for creating a new habit
router.post("/create", tokenauth.verifyToken, (req, res)=>{
    //user id: 
});

module.exports = router;