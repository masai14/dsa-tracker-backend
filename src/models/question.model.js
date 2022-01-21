// QUESTION MODEL

/* Some sample code for reference */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//question schema
const questionSchema = new Schema({
    title: { type: String, required: true },
    topic: { type: String, require: true },
    difficulty: { type: String, required: true },
    comments: { type: String },
    description: { type: String },
    platform: { type: String },
    code: { type: String },
    solved: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

//creating model for question
const Question = mongoose.model("question", questionSchema);

//export
module.exports = Question;