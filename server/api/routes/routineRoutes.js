const router = require("express").Router();
const validation = require("../../validation/validation");
const tokenauth = require("../../middleware/tokenauth");
const Routine = require("../../models/routineModel");
const User = require("../../models/userModel");
const moment = require("moment");
const mongoose = require("mongoose");
const querystring = require("querystring");

//test route for api habit routes
router.get("/test", (req, res) => {
  res.status(200).send("Welcome to the api: routine routes");
});

//route for creating a new habit
router.post("/addhabit", tokenauth.verifyToken, async (req, res) => {
  try {
    //validate fields
    const { errors, isValid } = await validation.validateCreateHabit(req.body);
    //if fields are not valid, send error back with error messages
    if (!isValid) {
      return res.status(400).json({ errors: errors, isValid: isValid });
    }

    // Generate an id for the habit
    let id = mongoose.Types.ObjectId();

    //build habit template
    let habit = {};
    habit.id = id;
    habit.title = req.body.title;
    habit.trigger = req.body.trigger;
    habit.type = req.body.type;
    habit.duration = req.body.duration;
    habit.completed = false;
    habit.durationCompleted = null;

    //retrieve the list of user routines
    let user = await User.findOne({ _id: req.body.id });
    let routines = user.routines;
    let currentRoutineID = routines[routines.length - 1];

    //push the new habit onto the routine's habit array
    await Routine.updateOne(
      { _id: currentRoutineID },
      { $push: { habits: habit } }
    );

    return res.status(200).json({ habit });
  } catch (err) {
    res.status(500).json({ serverError: err.message, isValid: false });
  }
});

// Delete habit
router.post("/deleteHabit", tokenauth.verifyToken, async (req, res) => {
  try {
    // Check if a user id was provided
    if (!req.body.userId) {
      console.log("User id was not provided.");
      return res.sendStatus(400);
    }

    // Check if a habit id was provided
    if (!req.body.habitId) {
      console.log("Habit id was not provided.");
      return res.sendStatus(400);
    }

    // Fetch routine id
    let userData = await User.findOne(
      { _id: req.body.userId },
      { routines: 1 }
    );
    let routines = userData.routines;
    let routineId = routines[routines.length - 1];

    // Fetch habits
    let routineData = await Routine.findOne({ _id: routineId }, { habits: 1 });
    let habitsData = routineData.habits;

    // Delete habit
    habitsData = habitsData.filter(function (item) {
      return item.id.toString() !== req.body.habitId;
    });

    // Update habits
    await Routine.updateOne(
      { _id: routineId },
      { habits: habitsData, dateupdated: Date.now() }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// Get a user's habits
router.get("/gethabits", tokenauth.verifyToken, async (req, res) => {
  try {
    // Check if an id was provided
    if (!req.query.id) {
      console.log("User id was not provided.");
      return res.sendStatus(400);
    }

    // Fetch the user's routine ids
    let userData = await User.findOne({ _id: req.query.id }, { routines: 1 });
    let userRoutines = userData.routines;

    console.log("blah", userRoutines, userRoutines.length);

    // Create an array of rountine ids
    let conditions = [];
    for (let i = 0; i < userRoutines.length; i++) {
      conditions.push({ _id: userRoutines[i] });
    }

    console.log("cond", conditions);

    // Fetch routines
    let routineObjs = await Routine.find(
      { $or: conditions },
      { date: 1, habits: 1 }
    );

    console.log("objs", routineObjs);

    // Return rountines
    return res.status(200).json({ routines: routineObjs });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.get("/getLatestRoutine", tokenauth.verifyToken, async (req, res) => {
  try {
    // Check if an id was provided
    if (!req.query.id) {
      console.log("User id was not provided.");
      return res.sendStatus(400);
    }

    // Fetch the user's routine ids
    let userData = await User.findOne({ _id: req.query.id }, { routines: 1 });
    let userRoutines = userData.routines;

    let routineId = userRoutines[userRoutines.length - 1];

    let routine = await Routine.findOne({ _id: routineId });

    let today = moment().date();
    let routineDate = moment(routine.date).date();

    if (moment(today).isAfter(routineDate)) {
      const newHabits = routine.habits.map(habit => {
        return {
          ...habit,
          completed: false,
        };
      });

      const newRoutine = new Routine({
        date: new Date(),
        habits: newHabits,
      });

      const savedRoutine = await newRoutine.save();

      userRoutines.push(savedRoutine.id);

      await User.updateOne({ _id: req.query.id }, { routines: userRoutines });

      console.log("saved", savedRoutine);

      return res.status(200).json({ routine: savedRoutine });
    } else {
      console.log("old", routine);
      return res.status(200).json({ routine: routine });
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// Update habits
router.put("/updateHabit", tokenauth.verifyToken, async (req, res) => {
  try {
    // Check if user id was provided
    if (!req.body.userId) {
      console.log("User id was not provided.");
      return res.sendStatus(400);
    }

    // Check if habit was provided
    if (!req.body.habit) {
      console.log("Habit object was not provided.");
      return res.sendStatus(400);
    }

    // Fetch routine id
    let userData = await User.findOne(
      { _id: req.body.userId },
      { routines: 1 }
    );
    let routines = userData.routines;
    let routineId = routines[routines.length - 1];

    // Fetch habits
    let routineData = await Routine.findOne({ _id: routineId }, { habits: 1 });
    let habitsData = routineData.habits;

    // Replace habit
    const index = habitsData.findIndex(function (item) {
      console.log("Item Id", item.id);
      return item.id.toString() === req.body.habit.id;
    });

    habitsData[index] = req.body.habit;
    await Routine.updateOne(
      { _id: routineId },
      { habits: habitsData, dateupdated: Date.now() }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
