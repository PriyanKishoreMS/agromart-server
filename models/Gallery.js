const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("gallery", GallerySchema);
