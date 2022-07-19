const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
}

const regex = (password) => { 
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (pattern.test(password)) {
        return true;
    }

    return false;
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) {
            return res.status(501).send({ message: "User already exists" });
        }

        let regexPatternCheck = await regex(req.body.password);
        // This can be done using the express-validator also.
        if (!regexPatternCheck) { 
            return res.status(501).send({ message: "Password is too weak" });
        }

        user = await User.create(req.body);

        let token;
        try {
            token = generateToken(user);
        } catch (err) {
            return res.status(200).send({ message: "Signup failed" });
        }

        return res.status(200).send({ message: "success", token });
    } catch (err) {
        return res.status(501).send({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(501).send({ message: "Please try another email or password" });
        }

        let passwordMatch = user.checkPassword(req.body.password);

        if (!passwordMatch) {
            return res.status(501).send({ message: "Please try another email or password" });
        }

        let token;
        try {
            token = generateToken(user);
        } catch (err) {
            return res.status(200).send({ message: "SignIn failed" });
        }

        return res.status(200).send({ message: "success", token });
    } catch (err) {
        return res.status(501).send({ message: err.message });
    }
}

module.exports = { login, register }