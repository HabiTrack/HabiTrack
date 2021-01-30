const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    routines: {type: Array, default: []},
    datecreated: {type: Date, required: true, default: Date.now},
    dateupdated: {type: Date, required: true, default: Date.now},
    isDeleted: {type: Boolean, default: false}
});

module.exports = User = mongoose.model("user", userSchema);