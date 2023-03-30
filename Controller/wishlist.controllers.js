const wishlistSchema = require("../Models/wishlist.model")
const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")

module.exports = {

	addWishlist: async (req, res) => {
		try {
			const data = {
				productId: req.query.id,
				userId: req.user._id,
				isWishlisted: true
			}
			const create = await wishlistSchema.create(data)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.WISHLISTED_ADDED, create });
		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	getWishlist: async (req, res) => {
		try {
			const getProduct = await wishlistSchema.find({ userId: req.user._id }).populate("productId")
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, product: getProduct });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	deleteWishlist: async (req, res) => {
		try {
			const product = await wishlistSchema.findByIdAndDelete(req.query.id)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.WISHLISTED_REMOVE, product });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	}

}