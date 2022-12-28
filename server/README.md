# E-Commerce-Server


Hosted URL: https://ecommerce-api-5imz.onrender.com/

Deployed on Render: https://dashboard.render.com/

## Introduction
This is API Docs for a API E-Commerce Application. Here, you will find All the Endpoints in this API.

## This is the URL where the API is hosted
The URL is:
http://localhost:5001
Example Usage
Below is the Simple Example how you can use this library to fetch all Products available in the database used in backend for this API:

`// Please Note: This Example Code uses axois Library and the Below code is in JavaScript
const res = await axios.get(http://localhost:5001/api/product/products);`

Outcome: res.data.products will give you all the products available in database

## Auth Routes
/api/signup: Register the User

/api/login: Login the User

/api/users/:userId: Update the User

/api/verify-email: Verify the User Path Email. This path is automatically used during Registration

/api/forgot-password/:email Forget Password Email. Recieve Product Password Email to Update password if forgetten

/api/users/:passwordResetCode/reset-password Reset the password

## Product Routes
/api/product/products: Get All Products. This End Support further query on the basic of URL query

/api/product/create: Create a New Product only if you are logged in as Admin

## Contact Routes
/api/contact: Send the Owner that is me (Amrit) the query of Customer
