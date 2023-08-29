const { createDonation, getAllDonations } = require("../db/donationQueries");

exports.postDonation = async (req, res) => {
	try {
		const { name, email, donation, purpose, type, message } = req.body;
		const donateData = {
			name,
			email,
			donation,
			purpose,
			type,
			message,
		};
		const result = await createDonation(donateData);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error posting donation", err: err.message });
	}
};

exports.getDonations = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "createdAt";
		const order = req.query.order || "desc";

		let donations = await getAllDonations(page, limit, search, sort, order);
		res.json(donations);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting donations", err: err.message });
	}
};
