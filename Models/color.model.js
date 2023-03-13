const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
	{
		name: { type: String },
		isActive: { type: Boolean, default: true },
		categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newColor = new mongoose.model("color", colorSchema, "color");
module.exports = newColor;
