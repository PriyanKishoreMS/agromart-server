const mongoose = require("mongoose");

const LandSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		landLocation: {
			type: String,
			required: true,
		},
		landArea: {
			type: String,
			required: true,
		},
		registered: {
			type: Boolean,
			default: true,
		},
		cropType: {
			type: String,
			required: true,
		},
		cultivationType: {
			type: String,
			required: true,
		},
		cultivationHistory: {
			type: String,
		},
		soilType: {
			type: String,
		},
		waterFacility: {
			type: String,
		},
		landPrice: {
			type: String,
			required: true,
		},
		landDesc: {
			type: String,
		},
		landImage: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("land", LandSchema);
