// First Read all the Configurations
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const connectDatabase = require("./dbConnection");
const cors = require("cors");
const path = require("path");
const routes = require('./src/routes');
const errorHandlerMiddleware = require("./src/middleware/errorHandlerMiddleware");
const { unhandledRejectionHandler } = require("./src/util/error handling/unhandledRejectionHandler");
const { uncaughtExceptionHanndler } = require("./src/util/error handling/uncaughtExceptionHandler");

// Handling Uncaught Exception
uncaughtExceptionHanndler();

//connecting to database
connectDatabase.connectDatabase();
// Middleware
app.use(express.json());
app.use(cors());



// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Middleware for error handler
app.use(errorHandlerMiddleware);


const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})



unhandledRejectionHandler(server);