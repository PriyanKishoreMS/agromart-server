const Donate = require("../models/Donate");

exports.createDonation = async donateData => {
	try {
		const donate = new Donate(donateData);
		const result = await donate.save();
		return result;
	} catch (err) {
		console.error({ Message: "Query Error creating donation", Error: err });
		throw err;
	}
};

exports.getAllDonations = async (page, limit, search, sort, order) => {
	try {
		let donations = await Donate.find({
			name: { $regex: search, $options: "i" },
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const total = await Donate.countDocuments({
			name: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			donations,
			total,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Query Error getting donations", Error: err });
		throw err;
	}
};
