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
			.populate("user", "name photoURL");

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
