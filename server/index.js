const express = require("express");
const app = express();
const connectDatabase = require("./dbConnection");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();