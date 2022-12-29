const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");
const ErrorHander = require("../util/error handling/Error Handler");
const Order = require("../models/OrderModel");


// Create new Order
exports.createOrderController = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        userId,
        paymentInfo,
        amount
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        amount,
        userId,
    });

    res.status(201).json({
        success: true,
        order,
    });
});
