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
        colors: [{
            type: String,
            required: true
        }],
        stock: {
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
        shipping: {
            type: Boolean,
            default: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        company: {
            type: String
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
            //default: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);