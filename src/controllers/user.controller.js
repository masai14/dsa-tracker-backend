//USER CONTROLLER

//create a router
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();

//getting model
const User = require("../models/user.model.js");
const Question = require("../models/question.model.js");
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

/* Some sample code for reference */

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
}

router.get("/", authenticate, authorize(['admin', 'superAdmin']), async (request, response) => {// authenticate, authorize
    try {
        const results = await User.find().lean().exec();
        // console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

router.get("/check", authenticate, async (request, response) => {// authenticate, authorize
    try {
        let user = await User.findById(request.user._id);
        let token = generateToken(user);
        // console.log(token);
        return response.send({ message: true, token });
    }
    catch (err) {
        // console.log(err.message);
        response.send({ message: false });
    }
});

//get specific user by id
router.get("/details", authenticate, async (request, response) => {// authenticate
    try {

        // depending upon the frontend, if the userId can be retrieved from the cookie, 
        // so you can use below code by passing the route as /: id
        // if (request.user._id !== request.params.id) {
        //     return response.status(401).send({ message: "invalid id" })
        // }

        // considering unable to retrive the userId from a cookie on the frontend,
        // using the token to generate the user out of it.
        // console.log(request.user);
        delete (request.user.role);
        delete (request.user.password);
        delete (request.user.createdAt);
        delete (request.user.updatedAt);
        return response.status(200).send(request.user);
    }
    catch (err) {
        response.status(501).send(err.message);
    }
});

// //create User
// router.post("/", async (request, response) => {
//     try {

//         //check if email already exists
//         const { email } = request.body;

//         let user = await User.findOne({ email });
//         console.log("printing user -> " + user);
//         if (user) return response.status(400).send("User already registered.");

//         //safely create new user
//         const results = await User.create(request.body);
//         return response.send(results);
//     }
//     catch (err) {
//         response.status(401).send(err.message);
//     }
// });

//update User by id
router.patch("/:id", authenticate, authorize(['user']), async (request, response) => {// authenticate, authorize('user')
    try {
        if (request.params.id == request.user._id) {
            // console.log(request.params.id, request.user._id, request.body, request.params.id == request.user._id)
            const results = await User.findByIdAndUpdate(request.user._id, request.body, { new: true });
            // console.log(results);
            return response.send(results);
        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

// delete User by id
router.delete("/:id", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {// authenticate, authorize('user', 'admin', 'superAdmin')
    try {
        const results = await User.findByIdAndDelete(request.params.id);
        // console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});


// //get specific user by email, password (login)
// router.get("/auth/login", async (request, response) => {
//     try {
//         const { email, password } = request.body;
//         const results = await User.findOne({ email, password });
//         if(!results) return response.status(400).send("Invalid email or password");
//         console.log(results);
//         return response.send(results);
//     }
//     catch (err) {
//         response.status(401).send(err.message);
//     }
// });



//get all questions for a user by userId
router.get("/questions", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {
    try {

        // console.log(request.query.difficulty);
        //user id will be getting from the auth token 
        const userId = request.user._id;

        if (!userId) return response.status(400).send("User id is required");

        const page = request.query.page || 1;
        const size = request.query.size || 10;
        const filteringOptions = [{ userId }];
        let additionalFilters = { $and: [] }

        if (Boolean(request.query.favourites)) {
            additionalFilters.$and.push({ isFav: true });
        }

        if (request.query.difficulty) {
            additionalFilters.$and.push({
                $or: [...request.query.difficulty.split(",").map(el => {
                    return {
                        "difficulty": el
                    };
                })]
            });//{ $in: request.query.difficulty.split(",") }//{ "difficulty": "1" }, { "difficulty": "2" }
        }

        if (request.query.platform) {
            additionalFilters.$and.push({
                $or: [...request.query.platform.split(",").map(el => {
                    return {
                        "platform": el
                    };
                })]
            });
        }

        if (request.query.status) {
            additionalFilters.$and.push({
                $or: [...request.query.status.split(",").map(el => {
                    if (el == "solved") {
                        return { solved: true };
                    } else {
                        return { solved: false };
                    }
                })]
            });
        }

        let sortOptions = { "updatedAt": -1 };
        if (request.query.sortby == "dateAsc") {
            sortOptions = { "updatedAt": 1 };
        } else if (request.query.sortby == "e2h") {
            sortOptions = { "difficulty": 1 };
        } else if (request.query.sortby == "h2e") {
            sortOptions = { "difficulty": -1 };
        }

        // console.log(sortOptions);
        // console.log(additionalFilters);
        if (additionalFilters.$and.length != 0) {
            filteringOptions.push(additionalFilters);
        }
        // console.log(filteringOptions, sortOptions);// { userId }, { $and: [...filteringOptions] }
        const platforms = await Question.aggregate([{
            $match: {
                userId: ObjectId(userId)
            }
        },
        {
            $group: { _id: "$platform", count: { $sum: 1 } }
        },
        {
            $sort: { _id: 1 }
        }
        ]);
        let questions;
        try {
            questions = await Question.find({ $and: [...filteringOptions] }).sort(sortOptions).skip((page - 1) * size).limit(size).lean().exec();
        } catch (err) {
            return response.status(400).send({ questions: [], totalPages: 1, platforms });
        }
        const totalQuestions = await Question.find({ $and: [...filteringOptions] }).countDocuments();
        const totalPages = Math.ceil(totalQuestions / size);

        return response.send({ questions, totalPages: Number(totalPages) === 0 ? 1 : totalPages, platforms });
        // const platforms = await Question.find({ userId }).distinct("platform");
        // console.log(typeof userId);
        // console.log(platforms);
        // const test = await Question.aggregate([
        //     {
        //         "$project": {
        //             "difficulty": {
        //                 "$filter": {
        //                     "input": "$difficulty",
        //                     "as": "difficulty",
        //                     "cond": {
        //                         "$eq": ["$difficulty", "1"]
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ]);
        // console.log(test.length);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

module.exports = router;