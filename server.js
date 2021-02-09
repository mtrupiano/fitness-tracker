// Add code to userModel.js to complete the model

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", 
                  { useNewUrlParser: true });

// Routes

// Route to create a new workout plan
app.post("/workout", ({body}, res) => {

});

// Route to get all workout plans
app.get("/workout", ({body}, res) => {
  db.Workout.find({})
    .then( (workout) => {
      res.json(workout);
    })
    .catch( ({message}) => {
      console.log(message);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
