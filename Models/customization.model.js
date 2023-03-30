const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        requirement: { type: String, required: true },
        quantity: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newCustomization = new mongoose.model("customization", customizationSchema, "customization");
module.exports = newCustomization;
