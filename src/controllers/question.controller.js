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
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get specific Question by id
router.get("/:id", authenticate, async (request, response) => {
    // console.log(request.params.id);
    try {
        const question = await Question.findById(request.params.id);
        // console.log(question);
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
    // console.log(request.body);
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
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

//get all questions for a user by userId
router.get("/user/questions", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {
    try {
        //user id will be getting from the auth token 
        const userId = request.user._id;

        if (!userId) return response.status(400).send("User id is required");

        const page = request.query.page || 1;
        const size = request.query.size || 10;
        const questions = await Question.find({ userId }).skip((page - 1) * size).limit(size).lean().exec();
        const totalQuestions = await Question.find({ userId }).countDocuments();
        const totalPages = Math.ceil(totalQuestions / size);

        if (questions.length === 0) return response.status(400).send("No questions found for this user");
        return response.send({ questions, totalQuestions, totalPages });
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

module.exports = router;