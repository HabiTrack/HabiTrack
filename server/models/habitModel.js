const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    title: {type: String, required: true},
    trigger: {type: String, required: true},
    type: {type: String, required: true, unique: true},
    duration: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    durationcompleted: {type: Date},
    datecreated: {type: Date, default: Date.now},
    dateupdated: {type: Date, default: Date.now}
});

module.exports = Habit = mongoose.model("habit", habitSchema);