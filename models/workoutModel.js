const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the Workout model
module.exports = Workout;