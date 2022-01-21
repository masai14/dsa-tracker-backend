//config data
const {DEFAULT_CONNECTION_STRING, PORT, MONGOOSE_OPTIONS} = require("./src/config/config");

//connect to express
const express = require("express");
const app = express();
app.listen(PORT, () => console.log(`DSA Tracker Web App connected successfully to Express. Listening on port ${PORT}...`));

//middlewares
const cors = require("cors");
app.use(cors())
app.use(express.json());

//connect to mongoose
const mongoose = require('mongoose');
mongoose.connect(DEFAULT_CONNECTION_STRING, MONGOOSE_OPTIONS);
mongoose.connection.on("error", err => {
  console.log("Connection Error. DSA Tracker Web App could not successfully connect to Mongoose.", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("DSA Tracker Web App connected successfully to Mongoose.");
});

//sample routes 
const questionController = require("./src/controllers/question.controller.js");
const userController = require("./src/controllers/user.controller.js");
app.use("/question", questionController);
app.use("/user", userController);