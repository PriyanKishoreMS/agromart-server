const {
	createGallery,
	getAllGallery,
	deleteFromGallery,
} = require("../db/galleryQueries");
const fs = require("fs");

exports.postGallery = async (req, res) => {
	try {
		const { content } = req.body;
		const image = req.file.path;
		const galleryData = {
			content,
			image,
		};
		const result = await createGallery(galleryData);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error posting gallery", err: err.message });
	}
};

exports.getGallery = async (req, res) => {
	try {
		let gallery = await getAllGallery();
		res.json(gallery);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting gallery", err: err.message });
	}
};

exports.deleteGallery = async (req, res) => {
	try {
		const { id } = req.params;
		let gallery = await deleteFromGallery(id);
		if (!gallery) return res.status(404).json({ msg: "Gallery not found" });
		fs.unlinkSync(gallery.image);
		res.json({ gallery, msg: "Gallery deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error deleting gallery", err: err.message });
	}
};
