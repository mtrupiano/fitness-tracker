const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: "Exercise name is required"
    },
    type: {
        type: String,
        required: "Exercise type is required"
    },
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number
});

// This creates our model from the above schema, using mongoose's model method
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// Export the Ecercise model
module.exports = Exercise;