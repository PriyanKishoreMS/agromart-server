const mongoose = require("mongoose");

const LandSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	landLocation: {
		type: String,
		required: true,
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
});

module.exports = mongoose.model("land", LandSchema);
