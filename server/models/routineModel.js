const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    habits: {type: Array, default: []},
    datecreated: {type: Date, default: Date.now},
    dateupdated: {type: Date, default: Date.now}
});

module.exports = Routine = mongoose.model("routines", routineSchema);