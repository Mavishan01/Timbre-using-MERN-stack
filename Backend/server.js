// This code sets up a web server using Express and connects it to a MongoDB database. It defines routes for handling workout-related requests and logs every request to the console.
require("dotenv").config();
const express = require("express");
const app = express(); //Express app
const mongoose = require("mongoose");

// const workoutRouts = require("./routes/workouts");
const Product = require("./models/product");
const Category = require("./models/category")
const Brand = require("./models/brand")
const model = require("./models/model")



// Middleware
//  This middleware converts incoming request bodies to JSON
app.use(express.json());

// Routes
// app.use("/api/workouts", workoutRouts);


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
        console.log("Connected to db & listening to port", process.env.PORT);
    });

    })
    .catch((error) => {
    console.log(error);
    });



