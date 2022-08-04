// GLOBAL CONFIG ENVIRONMENT VARIABLES


//server host name
const HOST = "localhost";

//remote database name
const DATABASE = "DSATracker";

//database credentials
const USERNAME = "dsatracker";
const PASSWORD = "dsatracker";

//default app port
const PORT = process.env.PORT || 2345;

//default connection url
const DEFAULT_CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@dsatracker.1osbv.mongodb.net/${DATABASE}?retryWrites=true&w=majority`; 

//mongoose options for connection
const MONGOOSE_OPTIONS = {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
    useNewUrlParser:true
}

module.exports = {HOST, PORT, DATABASE, USERNAME, PASSWORD, DEFAULT_CONNECTION_STRING, MONGOOSE_OPTIONS}