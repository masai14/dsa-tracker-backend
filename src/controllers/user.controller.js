//USER CONTROLLER

//create a router
const express = require("express");
const router = express.Router();

//getting model
const User = require("../models/user.model.js");

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

/* Some sample code for reference */

router.get("/", async (request, response) => {
    try {
        const results = await User.find().lean().exec();
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get specific user by id
router.get("/:id", async (request, response) => {
    try {
        const results = await User.findById(request.params.id);
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get specific user by email, password (login)
router.get("/login", async (request, response) => {
    try {
        const results = await User.find(request.body);
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//create User
router.post("/", async (request, response) => {
    try {

        //check if email already exists
        const { email } = request.body;

        let user = await User.findOne({ email });
        console.log("printing user -> " + user);
        if (user) return response.status(400).send("User already registered.");

        //safely create new user
        const results = await User.create(request.body);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//update User by id
router.patch("/:id", async (request, response) => {
    try {
        const results = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

// delete User by id
router.delete("/:id", async (request, response) => {
    try {
        const results = await User.findByIdAndDelete(request.params.id);
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

module.exports = router;