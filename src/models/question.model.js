// QUESTION MODEL

/* Some sample code for reference */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//question schema
const questionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true},
    topic: { type: String, require: true },
    link: { type: String, required: true },
    difficulty: { type: String, required: true },
    intuition: { type: String, default:"Add your Intuition by clicking the edit button" },
    description: { type: String, default: "Add your Description by clicking the edit button" },
    platform: { type: String},
    code: { type: String, default: "Add your Code by clicking the edit button" },
    solved: { type: Boolean, default: false },
    isFav: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false }

}, {
    timestamps: true,
    versionKey: false
});

//creating model for question
const Question = mongoose.model("question", questionSchema);

//export
module.exports = Question;