const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Product Name"],
            trim: true
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        Stock: {
            type: Number,
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
        },
        category: {
            type: String
        },
        description: {
            type: String,
            required: [true, "Please Enter Product Description"]
        },
        price: {
            type: Number,
            required: [true, "Please Enter Product Prize"],
            maxlength: [8, "Prize cannot exceed 8 Figures"]
        },
        featured: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
        },
        company: {
            type: String,
            enum: {
                values: ["apple", "samsung", "dell", "mi"],
                message: `{VALUE} is not supported`,
            },
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);