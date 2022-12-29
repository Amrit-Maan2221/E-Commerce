// First Read all the Configurations
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const connectDatabase = require("./src/dbConnection");
const cors = require("cors");
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const path = require("path");
const routes = require('./src/routes');
const errorHandlerMiddleware = require("./src/middleware/errorHandlerMiddleware");
const { unhandledRejectionHandler } = require("./src/util/error handling/unhandledRejectionHandler");
const { uncaughtExceptionHanndler } = require("./src/util/error handling/uncaughtExceptionHandler");
var bodyParser = require('body-parser');

// Handling Uncaught Exception
uncaughtExceptionHanndler();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//connecting to database
connectDatabase.connectDatabase();
// Middleware
app.use(express.json());






// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/home.html'));
})

// Middleware for error handler
app.use(errorHandlerMiddleware);


const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})



unhandledRejectionHandler(server);