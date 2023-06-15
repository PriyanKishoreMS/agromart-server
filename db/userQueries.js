const User = require("../models/User");

exports.findUser = async email => {
	let user = await User.findOne({ email });
	return user;
};

exports.getAllUsers = async () => {
	let user = await User.find();
	return user;
};

exports.createNewUser = async (uid, name, email, mobile, photoURL) => {
	let user = new User({
		uid,
		name,
		email,
		mobile,
		photoURL,
	});

	await user.save();
	return user;
};
