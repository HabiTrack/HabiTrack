const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());

//connect to mongo db via mongoose
mongoose.connect(process.env.MONGODB_CONNECT, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true, 
}, (err) => {
    if (err) {
        console.log("Mongo DB failed to connect!");
        throw err;
    } else {
        console.log("Mongo DB connected!");
    }
});

//api routes
app.use("/api/users", require("./api/routes/userRoutes"));
app.use("/api/auth", require("./api/routes/authRoutes"));
app.use("/api/routines", require("./api/routes/routineRoutes"));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});