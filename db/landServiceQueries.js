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
		const sortOption = { [sort]: order === "desc" ? -1 : 1 };
		const landServices = await LandService.find({
			landLocation: { $regex: search, $options: "i" },
		})
			.sort(sortOption)
			.skip(page * limit)
			.limit(limit)
			.populate("user", "name photoURL");

		const total = await LandService.countDocuments({
			landLocation: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(total / limit);

		return {
			page,
			landServices,
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
