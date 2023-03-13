const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
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

const newsubCategory = new mongoose.model("subCategory", subCategorySchema, "subCategory");
module.exports = newsubCategory;
