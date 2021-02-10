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

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", 
                  { useNewUrlParser: true });

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

// Mock data
async function seed() {
  const exercises = [];
  exercises.push(await db.Exercise.create({
    name: "Bench press",
    type: "strength",
    weight: 100,
    sets: 3,
    reps: 5
  }));
  
  exercises.push(await db.Exercise.create({
    name: "Bicep curls",
    type: "strength",
    weight: 20,
    sets: 3,
    reps: 10
  }));
  
  db.Workout.create({
    name: "My first workout",
    exercises: exercises
  }).then( (workout) => {
    console.log(workout);
  }).catch( ({ message }) => {
    console.log(message);
  });
}

seed();

// Routes

// Route to create a new workout plan
app.post("/workout", ({body}, res) => {
  db.Workout.create({
    name: body.name
  }).then( (result) => {
    res.json(result);
  }).catch( (err) => {
    res.status(500).json(err);
  })
});

// Route to get all workout plans
app.get("/workout", ({body}, res) => {
  db.Workout.find({}).lean().populate('exercises')
    .then( (workout) => {
      res.render('index', { workout });
    })
    .catch( ({message}) => {
      console.log(message);
    });
});

// Route to create a new exercise and add it to a workout
app.post('/exercise', ({body}, res) => {
  db.Exercise.create(body)
    .then( ({_id}) => {
      const filter = body.workoutID;
      db.Workout.findByIdAndUpdate(filter, 
        { $push: { exercises: _id } }, (err, docs) => {

        }).then(() => {return})
    }).then( (result) => {
      res.json(result);
    }).catch( (err) => {
      res.status(500).json(err);
    });
});

// Delete an exercise
app.delete('/exercise/:id', (req, res) => {
  db.Exercise.deleteOne({ '_id': req.params.id })
    .then( (result) => {
      res.json(result);
    })
    .catch( (err) => {
      res.status(500).json(err);
    })
});

// Delete a workout plan
app.delete('/workout/:id', (req, res) => {
  db.Workout.deleteOne({ '_id': req.params.id })
    .then( (result) => {
      res.json(result);
    })
    .catch( (err) => {
      res.status(500).json(err);
    })
})

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
