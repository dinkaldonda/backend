const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        email: { type: String, required: true },
        review: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newReview = new mongoose.model("review", reviewSchema, "review");
module.exports = newReview;
