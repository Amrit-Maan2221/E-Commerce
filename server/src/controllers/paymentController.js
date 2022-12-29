const router = require("express").Router();
const STRIPE_KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(STRIPE_KEY);
const { v4: uuid } = require('uuid');
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");
const ErrorHandler = require("../util/error handling/Error Handler");

exports.paymentController = catchAsyncErrors(async (req, res, next) => {
    stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            next(new ErrorHandler(stripeErr, 500));
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
});

