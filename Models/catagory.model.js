const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: { type: String },
		isActive: { type: Boolean, default: true }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newCategory = new mongoose.model("category", categorySchema, "category");
module.exports = newCategory;
