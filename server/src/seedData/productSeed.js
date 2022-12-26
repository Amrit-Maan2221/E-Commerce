require("dotenv").config({path:"../../.env"});
const connectDatabase = require("../../dbConnection");
const Product = require("../models/ProductModel");

const ProductJson = require("./productsSeed.json");

const start = async () => {
  try {
    //connecting to database
    connectDatabase.connectDatabase();

    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();