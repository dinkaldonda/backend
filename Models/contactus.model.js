const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
    {
        email: { type: String },
        subject: { type: String },
        message: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newContact = new mongoose.model("contactUs", contactUsSchema, "contactUs");
module.exports = newContact;
