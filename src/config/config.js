// GLOBAL CONFIG ENVIRONMENT VARIABLES
require("dotenv").config();
//server host name
const HOST = "localhost";

// //remote database name
// const DATABASE = "DSATracker";

// //database credentials
// const USERNAME = "dsatracker";
// const PASSWORD = "dsatracker";

//default app port
const PORT = process.env.PORT;

//default connection url
const DEFAULT_CONNECTION_STRING = process.env.MONGODB_URL; 

//mongoose options for connection
const MONGOOSE_OPTIONS = {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
    useNewUrlParser:true
}

module.exports = {HOST, PORT, DEFAULT_CONNECTION_STRING, MONGOOSE_OPTIONS}