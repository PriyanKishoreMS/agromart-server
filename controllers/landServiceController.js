const {
	createLandService,
	getAllLandServices,
	getAllLandServicesinCategory,
	getLandServiceByIdOnDb,
	deleteLandServiceOnDb,
	updateLandServiceOnDb,
} = require("../db/landServiceQueries");
const fs = require("fs");

exports.getLandServices = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "landLocation";
		const order = req.query.order || "desc";

		let landServices = await getAllLandServices(
			page,
			limit,
			search,
			sort,
			order
		);
		res.json(landServices);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting lands", err: err.message });
	}
};

exports.getLandCategory = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "date";
		const order = req.query.order || "desc";
		const category = req.params.category;

		let landServices = await getAllLandServicesinCategory(
			page,
			limit,
			search,
			sort,
			order,
			category
		);
		res.json(landServices);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ msg: "Error getting land category", err: err.message });
	}
};

exports.postLandService = async (req, res) => {
	try {
		const user = req.user.id;
		const {
			landLocation,
			soilType,
			landArea,
			cropType,
			cultivationType,
			cultivationHistory,
			waterFacility,
			landPrice,
			landDesc,
		} = req.body;
		let landImage = {};
		landImage = req.files.map(file => {
			return {
				name: file.originalname,
				image: {
					data: file.buffer,
					contentType: file.mimetype,
				},
			};
		});
		const landData = {
			user,
			landLocation,
			soilType,
			landArea,
			cropType,
			cultivationType,
			cultivationHistory,
			waterFacility,
			landPrice,
			landDesc,
			landImage,
		};
		const result = await createLandService(landData);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error creating land", err: err.message });
	}
};

exports.getLandServiceById = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await getLandServiceByIdOnDb(id);
		if (!result) return res.status(404).json({ msg: "Land not found" });
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting land", err: err.message });
	}
};

exports.deleteLandService = async (req, res) => {
	try {
		const reqUser = req.user.id;
		const role = req.user.role;
		const id = req.params.id;
		const doc = await getLandServiceByIdOnDb(id);
		if (!doc) return res.status(404).json({ msg: "Land not found" });
		const docUser = doc.user._id.toString();
		if (reqUser !== docUser && role !== "admin")
			return res.status(401).json({ msg: "Unauthorized" });
		const result = await deleteLandServiceOnDb(id);
		const photos = result.landImage;
		photos.forEach(photo => {
			fs.unlinkSync(photo);
		});
		res.json({ result, msg: "Land deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error deleting land", err: err.message });
	}
};

exports.updateLandService = async (req, res) => {
	try {
		const reqUser = req.user.id;
		const role = req.user.role;
		const id = req.params.id;
		const doc = await getLandServiceByIdOnDb(id);
		if (!doc) return res.status(404).json({ msg: "Land not found" });
		const docUser = doc.user._id.toString();
		if (reqUser !== docUser && role !== "admin")
			return res.status(401).json({ msg: "Unauthorized" });
		const {
			landLocation,
			soilType,
			landArea,
			cropType,
			cultivationType,
			cultivationHistory,
			waterFacility,
			landPrice,
			landDesc,
		} = req.body;
		const landImage = req.files.map(file => file.path);
		const landData = {
			landLocation,
			soilType,
			landArea,
			cropType,
			cultivationType,
			cultivationHistory,
			waterFacility,
			landPrice,
			landDesc,
			landImage,
		};
		const result = await updateLandServiceOnDb(id, landData);
		res.json({ result, msg: "Land updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error updating land", err: err.message });
	}
};
