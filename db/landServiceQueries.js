const LandService = require("../models/LandService");

exports.createLandService = async landData => {
	try {
		let landService = new LandService(landData);
		await landService.save();
		return landService;
	} catch (err) {
		console.error({ Message: "Query Error creating land service", Error: err });
	}
};

exports.getAllLandServices = async (page, limit, search, sort, order) => {
	try {
		let landService = await LandService.find({
			landLocation: { $regex: search, $options: "i" },
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit)
			.populate("user", "name photoURL email");

		const total = await LandService.countDocuments({
			landLocation: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			landService,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Query Error getting land services", Error: err });
	}
};

exports.getAllLandServicesinCategory = async (
	page,
	limit,
	search,
	sort,
	order,
	category
) => {
	try {
		let lands = await LandService.find({
			landLocation: { $regex: search, $options: "i" },
			cultivationType: category,
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit)
			.populate("user", "name photoURL");

		const total = await LandService.countDocuments({
			landLocation: { $regex: search, $options: "i" },
			cultivationType: category,
		});

		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			lands,
			totalPages,
		};
	} catch (err) {
		console.error({
			Message: "Query Error getting category land services",
			Error: err,
		});
		throw err;
	}
};

exports.getLandServiceByIdOnDb = async id => {
	try {
		let land = await LandService.findById(id).populate("user", "name photoURL");
		if (!land) return null;
		return land;
	} catch (err) {
		console.error({
			Message: "Query Error getting land service by id",
			Error: err,
		});
		throw err;
	}
};

exports.deleteLandServiceOnDb = async id => {
	try {
		let deletedLand = await LandService.findByIdAndDelete(id);
		if (!deletedLand) return null;
		return deletedLand;
	} catch (err) {
		console.error({ Message: "Query Error deleting land service", Error: err });
		throw err;
	}
};

exports.updateLandServiceOnDb = async (id, landData) => {
	try {
		let updatedLand = await LandService.findByIdAndUpdate(id, landData, {
			new: true,
		});
		if (!updatedLand) return null;
		return updatedLand;
	} catch (err) {
		console.error({ Message: "Query Error updating land service", Error: err });
		throw err;
	}
};
