const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema(
    {
        shippingInfo: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                color:{
                    type: String,
                    required: true
                },
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                    required: true
                },
                image:{
                    type: String,
                    required: true
                },
            },
        ],
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: false
        },
        paymentInfo: {
            id: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            recipt:{
                type: String,
                required: true
            }
        },
        paidAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "Processing",
            enum: {
                values: ["Processing", "Complete", "Declined"],
                message: `{VALUE} is not supported`,
            },
        },
        deliveredAt: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);