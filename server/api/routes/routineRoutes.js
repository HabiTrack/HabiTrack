const router = require('express').Router();
const validation = require('../../validation/validation');
const tokenauth = require('../../middleware/tokenauth');
const Routine = require('../../models/routineModel');
const User = require('../../models/userModel');

//test route for api habit routes
router.get("/test", (req, res) => {
    res.status(200).send("Welcome to the api: routine routes")
});

//route for creating a new habit
router.post("/addhabit", tokenauth.verifyToken, async (req, res)=>{
    try {
        //validate fields
        const {errors, isValid} = await validation.validateCreateHabit(req.body);
        //if fields are not valid, send error back with error messages
        if (!isValid) {
            return res.status(400).json({errors: errors, isValid: isValid});
        }

        //build habit template
        let habit = {};
        habit.title = req.body.title;
        habit.trigger = req.body.trigger;
        habit.type = req.body.type;
        habit.duration = req.body.duration;
        habit.completed = false;
        habit.durationCompleted = null;

        //retrieve the list of user routines
        let user = await User.findOne({_id: req.body.id});
        let routines = user.routines;
        let currentRoutineID = routines[routines.length-1];

        //push the new habit onto the routine's habit array
        await Routine.updateOne({_id: currentRoutineID}, {$push: {habits: habit}});

        return res.status(200).json({habit});
    } catch (err) {
        res.status(500).json({serverError: err.message, isValid: false});
    }
});

// Get a user's habits
router.get("/gethabits", tokenauth.verifyToken, async (req, res) => {
    try {
        // Check if an id was provided
        if (!req.body.id) {
            console.log("User id was not provided.");
            return res.sendStatus(500);
        }

        // Fetch the user's routine ids
        let userData = await User.findOne({_id: req.body.id}, {routines: 1});
        let userRoutines = userData.rountines;

        // Create an array of rountine ids
        let conditions = [];
        for (i = 0; i < userRoutines.length; i++) {
            conditions.push({_id: userRoutines[i]});
        }

        // Fetch routines
        let routineObjs = await Routine.find({$or: conditions});

        // Return rountines
        return res.status(200).json({routineObjs});
    } catch {
        console.error(err);
        return res.sendStatus(500); 
    }
});

module.exports = router;