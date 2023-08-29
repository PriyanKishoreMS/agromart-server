const mongoose = require("mongoose");

const DonateSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		donation: {
			type: Number,
			required: true,
		},
		transactionId: {
			type: String,
			required: true,
		},
		transactionMode: {
			type: String,
			required: true,
		},
		purpose: {
			type: String,
		},
		type: {
			type: String,
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("donate", DonateSchema);
