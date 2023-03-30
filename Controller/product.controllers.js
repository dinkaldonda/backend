const productSchema = require("../Models/product.model")
const categorySchema = require("../Models/catagory.model")
const subcategorySchema = require("../Models/subcatagory.model")
const addToCartSchema = require("../Models/addtocart.model")
const paymentSchema = require("../Models/payment.model")
const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
require("dotenv").config()
const ObjectId = require("mongoose").Types.ObjectId
const Stripe = require("stripe")
const { request } = require("express")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = {

	addProduct: async (req, res) => {
		console.log(req.body)
		console.log(req.user)
		try {
			const category = await categorySchema.findById({ _id: req.body.category })
			const subcategory = await subcategorySchema.findById({ _id: req.body.subCategory })
			if (!category || !subcategory) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.CATEGORY_NOT_FOUND });
			}
			const create = await productSchema.create({ ...req.body, vendorId: req.user._id })
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.PRODUCT_ADDED, create });
		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	getProduct: async (req, res) => {
		const role = req.user.role.role
		console.log(role)
		let criteria = {}
		if (role === "superAdmin") {
			if (req.query.status == 'Rejected') {
				criteria = { status: "Rejected" }
			} else if (req.query.status == 'Approved') {
				criteria = { status: "Approved" }
			} else {
				criteria = { status: "Pending" }
			}
		} else if (role === "vendor") {
			if (req.query.id) {
				if (req.query.status == 'Rejected') {
					criteria = { status: "Rejected" }
				} else if (req.query.status == 'Approved') {
					criteria = { status: "Approved" }
				} else {
					criteria = { status: "Pending" }
				}
				criteria = { ...criteria, vendorId: new ObjectId(req.query.id) }
			} else {
				criteria = { status: "Approved" }
			}
		} else if (role === "user") {
			criteria = { status: "Approved" }
		}
		const { min, max, letter } = req.body
		if (min & max) {
			criteria = { ...criteria, price: { $gte: min, $lte: max } }
		}
		if (letter) {
			criteria = { ...criteria, name: letter }
		}
		try {
			const getProduct = await productSchema.aggregate([
				{
					'$match': criteria
				},
				{
					'$lookup': {
						'from': 'category',
						'localField': 'category',
						'foreignField': '_id',
						'as': 'category'
					}
				}, {
					'$unwind': {
						'path': '$category',
						'preserveNullAndEmptyArrays': true
					}
				}, {
					'$lookup': {
						'from': 'subCategory',
						'localField': 'subCategory',
						'foreignField': '_id',
						'as': 'subCategory'
					}
				}, {
					'$unwind': {
						'path': '$subCategory',
						'preserveNullAndEmptyArrays': true
					}
				}, {
					'$sort': {
						'createdAt': -1
					}
				}
			])
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, product: getProduct });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
			const product = await productSchema.findByIdAndUpdate(
				req.query.id,
				req.body,
				{ new: true }
			)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, product });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			const product = await productSchema.findByIdAndDelete(req.query.id)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, product });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	updateProductStatus: async (req, res) => {
		const { id, status } = req.query
		const product = await productSchema.findById(id)
		if (!product) {
			return res
				.status(enums.HTTP_CODE.BAD_REQUEST)
				.json({ success: false, message: messages.PRODUCT_NOT_FOUND });
		}
		try {
			const updateProductStatus = await productSchema.findByIdAndUpdate(
				id,
				{ $set: { status: status } },
				{ new: true }
			)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, product: updateProductStatus });
		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	buyProduct: async (req, res) => {
		try {
			const line_items = req.body.cartItem.map((item) => {
				return {
					price_data: {
						currency: 'inr',
						product_data: {
							name: item.data[0].productId.name,
							description: item.data[0].productId.desc,
							images: [item.data[0].productId.image]
						},
						unit_amount: parseInt(item.data[0].productId.price - item.data[0].productId.discPrice) * 100,
					},
					quantity: item.data[0].productQuantity,
				}
			})
			const session = await stripe.checkout.sessions.create({
				shipping_address_collection: { allowed_countries: ['IN'] },
				shipping_options: [
					{
						shipping_rate_data: {
							type: 'fixed_amount',
							fixed_amount: { amount: 0, currency: 'inr' },
							display_name: 'Free shipping',
							delivery_estimate: {
								minimum: { unit: 'business_day', value: 5 },
								maximum: { unit: 'business_day', value: 7 },
							},
						},
					},
					{
						shipping_rate_data: {
							type: 'fixed_amount',
							fixed_amount: { amount: 5000, currency: 'inr' },
							display_name: 'Fastest Delivery',
							delivery_estimate: {
								minimum: { unit: 'business_day', value: 1 },
								maximum: { unit: 'business_day', value: 1 },
							},
						},
					},
				],
				phone_number_collection: {
					enabled: true
				},
				line_items,
				mode: 'payment',
				success_url: 'http://localhost:3000/checkoutSuccess',
				cancel_url: 'http://localhost:3000/Addtocart',
			});

			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, data: session.url });
		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
		}
	},
	addToCart: async (req, res) => {
		try {
			let { productId, productQuantity, type } = req.body
			productQuantity = productQuantity || 1
			if (type == "remove") {
				await addToCartSchema.findOneAndDelete({ productId: productId, userId: req.user._id })
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.PRODUCT_REMOVE });
			}
			const findProduct = await productSchema.findById(productId)
			const cartProduct = await addToCartSchema.findOne({ productId: productId, userId: req.user._id })
			if (cartProduct && findProduct.quantity < cartProduct.productQuantity + productQuantity) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.OUT_OF_STOCKS });
			}
			console.log(productQuantity)
			if (cartProduct) {
				console.log("exists")
				await addToCartSchema.findOneAndUpdate(
					{ productId: productId, userId: req.user },
					{ $inc: { productQuantity: productQuantity } }
				)
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.PRODUCT_INCREMENT + ' ' + productQuantity });
			} else {
				req.body.userId = req.user._id
				await addToCartSchema.create(req.body)
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.PRODUCT_ADDED_CART });
			}

		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
		}
	},
	getCartProduct: async (req, res) => {
		try {
			const product = await addToCartSchema.aggregate([
				{
					$match: { userId: req.user._id },
				},
				{
					$lookup: {
						from: "product",
						localField: "productId",
						foreignField: "_id",
						as: "productId",
					},
				},
				{
					$unwind: {
						path: "$productId",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$group: {
						_id: "$productId",
						data: {
							$push: "$$ROOT",
						},
					},
				},
			])
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.SUCCESS, product });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
		}
	},
	orderSuccess: async (req, res) => {
		try {
			await addToCartSchema.deleteMany({ userId: req.user._id })
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.SUCCESS });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
		}
	}

}