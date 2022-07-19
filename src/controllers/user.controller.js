//USER CONTROLLER

//create a router
const express = require("express");
const router = express.Router();

//getting model
const User = require("../models/user.model.js");
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

/* Some sample code for reference */

router.get("/", authenticate, authorize(['admin', 'superAdmin']), async (request, response) => {// authenticate, authorize
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
router.get("/details", authenticate, async (request, response) => {// authenticate
    try {

        // depending upon the frontend, if the userId can be retrieved from the cookie, 
        // so you can use below code by passing the route as /: id
        // if (request.user._id !== request.params.id) {
        //     return response.status(401).send({ message: "invalid id" })
        // }

        // considering unable to retrive the userId from a cookie on the frontend, 
        // using the token to generate the user out of it.
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
        const results = await User.findByIdAndUpdate(request.user._id, request.body, { new: true });
        console.log(results);
        return response.send(results);
    }
    catch (err) {
        response.status(401).send(err.message);
    }
});

// delete User by id
router.delete("/:id", authenticate, authorize(['user', 'admin', 'superAdmin']), async (request, response) => {// authenticate, authorize('user', 'admin', 'superAdmin')
    try {
        const results = await User.findByIdAndDelete(request.params.id);
        console.log(results);
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

module.exports = router;