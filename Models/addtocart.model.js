const mongoose = require("mongoose");

const addtocartModel = new mongoose.Schema(
	{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		productQuantity: { type: Number, required: true }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newAddtocart = new mongoose.model("addToCart", addtocartModel, "addToCart");
module.exports = newAddtocart;
