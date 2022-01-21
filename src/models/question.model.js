// QUESTION MODEL

/* Some sample code for reference */

const mongoose = require("mongoose");
const { Schema } = mongoose;

//question schema
const questionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    topic: { type: String, require: true },
    link: { type: String, required: true },
    difficulty: { type: String, required: true },
    intuition: { type: String },
    description: { type: String },
    platform: { type: String },
    code: { type: String },
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