const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");
const ErrorHandler = require("../util/error handling/Error Handler");
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


// Get all Order
exports.getAllOrdersController = catchAsyncErrors(async (req, res, next) => {
    const { limit } = req.query;
    let orders;




    if (limit) {
        orders = await Order.aggregate([{
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user_info"
            }
        }, {
            $sort: { _id: -1 }
        }, {
            $limit: Number(limit)
        }]);
    }
    else {
        orders = await Order.aggregate([{
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user_info"
            }
        }]);
    }
    res.status(200).json(orders);
});


// GET MONTHLY INCOME
exports.getMonthlyIncomeController = catchAsyncErrors(async (req, res, next) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        next(new ErrorHandler(err));
    }
});
