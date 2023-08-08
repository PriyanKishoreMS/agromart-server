const User = require("../models/User");
const LandService = require("../models/LandService");
const Product = require("../models/Product");

exports.findUser = async email => {
	try {
		let user = await User.findOne({ email });
		return user;
	} catch (err) {
		console.error({ Message: "Error finding user", Error: err });
	}
};

exports.getAllUsers = async (page, limit, search, sort, order) => {
	try {
		let user = await User.find({
			$or: [
				{ name: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
			],
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const total = await User.find({
			$or: [
				{ name: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
			],
		}).countDocuments();

		const totalPages = Math.ceil(total / limit);

		return {
			page: page + 1,
			user,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Error finding user", Error: err });
	}
};

exports.createNewUser = async userData => {
	try {
		let user = new User(userData);
		await user.save();
		return user;
	} catch (err) {
		console.error({ Message: "Error creating user", Error: err });
	}
};

exports.updateUsers = async (id, userData) => {
	try {
		let user = await User.findByIdAndUpdate(
			id,
			{ $set: userData },
			{ new: true }
		);
		if (!user) throw new Error("User not found");
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteUser = async id => {
	try {
		let user = await User.findByIdAndDelete(id);
		if (!user) return null;
		return user;
	} catch (err) {
		console.error({ Message: "Error deleting user", Error: err });
		throw err;
	}
};

exports.getUserLandsOnDb = async (id, page, limit, sort, order) => {
	try {
		let lands = await LandService.find({ user: id })
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const total = await LandService.countDocuments({ user: id });
		const totalPages = Math.ceil(total / limit);

		return {
			page: page + 1,
			lands,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Error getting user lands", Error: err });
		throw err;
	}
};

exports.getUserProductsOnDb = async (id, page, limit, sort, order) => {
	try {
		let products = await Product.find({ user: id })
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const total = await Product.countDocuments({ user: id });
		const totalPages = Math.ceil(total / limit);

		return {
			page: page + 1,
			products,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Error getting user products", Error: err });
		throw err;
	}
};
