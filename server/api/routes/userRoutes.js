const router = require("express").Router();
const validation = require("../../validation/validation");
const bcrypt = require("bcryptjs");
const tokenauth = require("../../middleware/tokenauth");
const jwt = require("jsonwebtoken");

// User model
const User = require("../../models/userModel");
const { update } = require("../../models/userModel");

// Routine model
const Routine = require("../../models/routineModel");

// Test route
router.get("/test", (req, res) => {
  res.status(200).send("Welcome to the api: User Routes");
});

//get a user
router.get("/getbytoken", async (req, res) => {
  const bearerToken = req.headers["authorization"];
  const bearer = bearerToken.split(" ");
  const token = bearer[1].replace(",", "");
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  let user = await User.findOne({ _id: decoded._id });
  return res.status(200).json({ user: user });
});

// Create a new user
router.post("/create", async (req, res) => {
  try {
    // Validation
    const { errors, isValid } = await validation.validateUserCreate(req.body);
    if (!isValid) {
      return res
        .status(400)
        .json({ user: {}, isValid: isValid, errors: errors });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const pswHash = await bcrypt.hash(req.body.password, salt);

    // Create a new routine
    const newRoutine = new Routine();
    const routineId = newRoutine._id.toString();

    // Create a new user
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: pswHash,
      routines: routineId,
    });

    // Save user schema to DB
    const savedUser = await newUser.save();
    const saveRoutine = await newRoutine.save();

    res.status(200).json({ user: newUser, isValid: isValid, errors: errors });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update user information
router.post("/update", tokenauth.verifyToken, async (req, res) => {
  try {
    // Validation
    const { errors, isValid } = await validation.validateUserUpdate(req.body);
    if (!isValid) {
      return res.status(400).json({ isValid: isValid, errors: errors });
    }

    // Check if an id was provided
    if (!req.body.id) {
      console.log("User id was not provided.");
      return res.sendStatus(500);
    }

    // Updates JSON object
    let updates = {};

    // Update first name
    if (req.body.firstname) {
      updates.firstname = req.body.firstname;
    }

    // Update last name
    if (req.body.lastname) {
      updates.lastname = req.body.lastname;
    }

    // Update email
    if (req.body.email) {
      updates.email = req.body.email;
    }

    // Update password
    if (req.body.password) {
      // Hash the password
      const salt = await bcrypt.genSalt();
      const pswHash = await bcrypt.hash(req.body.password, salt);
      updates.password = pswHash;
    }

    // Update the user's info
    if (Object.keys(updates).length > 0) {
      updates.dateupdated = Date.now();
      await User.updateOne({ _id: req.body.id }, updates);
    }

    res.status(200).json({isValid: true});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Hide user
router.post("/hide", tokenauth.verifyToken, async (req, res) => {
  try {
    // Check if an id was provided
    if (!req.body.id) {
      console.log("User id was not provided.");
      return res.sendStatus(500);
    }

    await User.updateOne({ _id: req.body.id }, { isDeleted: true });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
