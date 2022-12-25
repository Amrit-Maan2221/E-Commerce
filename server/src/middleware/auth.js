const ErrorHandler = require("../util/error handling/Error Handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization == null) {
    return next(new ErrorHandler("Unable to process your process", 401));
    }  

    const token = authorization.split(' ')[1];
  const decodedData = jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(new ErrorHandler("Unable to process your process", 401));
    req.user = await User.findById(decoded.user._id);
  });
  next();
});