//USER MODEL

const mongoose = require("mongoose");
const { Schema } = mongoose;

//user schema
const userSchema = new Schema({

    //basic auth fields
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    github: { type: String },
    leetcode: { type: String },
    hackerrank: { type: String }

}, {timestamps: true, versionKey: false});

//creating model for user
const User = mongoose.model("User", userSchema);

//export
module.exports = User;