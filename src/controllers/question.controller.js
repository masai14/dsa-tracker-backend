//QUESTION CONTROLLER

//create a router
const express = require("express");
const router = express.Router();

//getting model
const Question = require("../models/question.model.js");
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

/* Some sample code for reference */

router.get("/", authenticate, authorize(['admin', 'superAdmin']), async (request, response) => {
    try {
        const results = await Question.find().lean().exec();
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get specific Question by id
router.get("/:id", authenticate, async (request, response) => {
    try {
        const question = await Question.findById(request.params.id);
        if (request.user.role == 'admin' || question.isPublic || question.userId === request.user._id) {
            return response.send(question);
        }
        return response.status(401).send({ message: "Unauthorized" });
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});


//create Question
router.post("/", authenticate, async (request, response) => {
    try {
        request.body.userId = request.user._id;
        const results = await Question.create(request.body);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//update Question by id
router.patch("/:id", authenticate, authorize(['user']), async (request, response) => {
    try {
        const results = await Question.findByIdAndUpdate(request.params.id, request.body, { new: true });
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

// delete question by id
router.delete("/:id", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {
    try {
        const results = await Question.findByIdAndDelete(request.params.id);
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get all questions for a user by userId
router.get("/user/questions", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {
    try {

        //user id needs to be passed in the request body
        const { userId } = request.body;
        if (!userId) return response.status(400).send("User id is required");

        const results = await Question.find(request.body);
        console.log(results);
        if (results.length === 0) return response.status(400).send("No questions found for this user");
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

module.exports = router;