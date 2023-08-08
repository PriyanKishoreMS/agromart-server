const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		productName: {
			type: String,
			required: true,
		},
		productCategory: {
			type: String,
			required: true,
		},
		productManufacturer: {
			type: String,
			required: true,
		},
		productDescription: {
			type: String,
			required: true,
		},
		productPrice: {
			type: String,
			required: true,
		},
		productImage: [String],
		productQuantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
