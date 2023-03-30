const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
		subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subCategory" },
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		desc: { type: String, required: true },
		material: { type: String, required: true },
		size: { type: String, required: true },
		shippingDays: { type: String, required: true },
		quantity: { type: Number, default: 0, required: true },
		price: { type: String, required: true },
		discPrice: { type: String, required: true },
		image: { type: String, required: true },
		status: { type: String, default: "Pending" },
		isPurchase: { type: Boolean, default: false }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newProduct = new mongoose.model("product", productSchema, "product");
module.exports = newProduct;
