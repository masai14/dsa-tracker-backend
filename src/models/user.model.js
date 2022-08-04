//USER MODEL
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
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
    hackerrank: { type: String },
    role: { type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user' },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    let hashedPassword = bcryptjs.hashSync(this.password, 8);
    this.password = hashedPassword;

    return next();
});

userSchema.methods.checkPassword = function (password) {
    return bcryptjs.compareSync(password, this.password)
}

//creating model for user
const User = mongoose.model("User", userSchema);

//export
module.exports = User;