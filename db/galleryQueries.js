const Gallery = require("../models/Gallery");

exports.createGallery = async galleryData => {
	try {
		const gallery = new Gallery(galleryData);
		const result = await gallery.save();
		return result;
	} catch (err) {
		console.error({ Message: "Query Error creating gallery", Error: err });
		throw err;
	}
};

exports.getAllGallery = async () => {
	try {
		let gallery = await Gallery.find();
		return gallery;
	} catch (err) {
		console.error({ Message: "Query Error getting gallery", Error: err });
		throw err;
	}
};

exports.deleteFromGallery = async id => {
	try {
		let gallery = await Gallery.findByIdAndDelete(id);
		if (!gallery) return null;
		return gallery;
	} catch (err) {
		console.error({ Message: "Query Error deleting gallery", Error: err });
		throw err;
	}
};
