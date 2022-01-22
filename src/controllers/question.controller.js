//QUESTION CONTROLLER

//create a router
const express = require("express");
const router = express.Router();

//getting model
const Question = require("../models/question.model.js");

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

/* Some sample code for reference */

router.get("/", async (request, response) => {
    try {
        const results = await Question.find().lean().exec();
        console.log(results);
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get specific Question by id
router.get("/:id", async (request, response) => {
    try {
        const results = await Question.findById(request.params.id);
        console.log(results);
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});


//create Question
router.post("/", async (request, response) => {
    try {
        const results = await Question.create(request.body);
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//update Question by id
router.patch("/:id", async (request, response) => {
    try {
        const results = await Question.findByIdAndUpdate(request.params.id, request.body, { new: true });
        console.log(results);
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

// delete question by id
router.delete("/:id", async (request, response) => {
    try {
        const results = await Question.findByIdAndDelete(request.params.id);
        console.log(results);
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get all questions for a user by userId
router.get("/user/:userid", async (request, response) => {
    try {

        //user id needs to be passed in the request body
        const { userid } = request.params;
        if(!userid) return response.status(400).send("User id is required");

        const results = await Question.find({ userId: request.params.userid });
        console.log(results);
        if(results.length === 0) return response.status(400).send("No questions found for this user");
        return response.send(JSON.stringify(results));
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

module.exports = router;