// First Read all the Configurations
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const connectDatabase = require("./dbConnection");
const cors = require("cors");
const path = require("path");
const routes = require('./src/routes');

//connecting to database
connectDatabase.connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());

console.log(routes)

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});


const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})