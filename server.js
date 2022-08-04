const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

//config data
const { DEFAULT_CONNECTION_STRING, PORT, MONGOOSE_OPTIONS } = require("./src/config/config");

//connect to express
const app = express();
app.listen(PORT, () => console.log(`DSA Tracker Web App connected successfully to Express. Listening on port ${PORT}...`));

//middlewares
app.use(cors());
app.use(express.json());


//connect to mongoose
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
const { register, login } = require('./src/controllers/auth.controller.js');
// we are not using the form-data, so no need of multer middileware for parsing the data express.json() will take care of that.
app.post('/api/register', register);
app.post('/api/login', login);
app.use("/api/question", questionController);
app.use("/api/user", userController);
