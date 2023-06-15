const { findUser, createNewUser, getAllUsers } = require("../db/userQueries");

exports.getUsers = async (req, res) => {
	try {
		let user = await getAllUsers();
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.postUsers = async (req, res) => {
	const { uid, name, email, mobile, photoURL } = req.body;
	try {
		let user = await findUser(email);
		if (user) {
			console.log(user, "User already exists");
			res.json({ user, message: "user exists" });
		} else {
			user = await createNewUser(uid, name, email, mobile, photoURL);
			res.json({ user, message: "user saved" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
