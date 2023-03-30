const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
	{
		name: { type: String }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newMaterial = new mongoose.model("material", materialSchema, "material");
module.exports = newMaterial;
