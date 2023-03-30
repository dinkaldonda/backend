const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
	{
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newPayment = new mongoose.model("payment", paymentSchema, "payment");
module.exports = newPayment;
