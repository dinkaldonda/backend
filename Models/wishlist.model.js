const mongoose = require("mongoose");

const wishlistModel = new mongoose.Schema(
	{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		isWishlisted: { type: Boolean, default: false }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newWishlist = new mongoose.model("wishlist", wishlistModel, "wishlist");
module.exports = newWishlist;
