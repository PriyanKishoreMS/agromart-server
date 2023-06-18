const { findUser, createNewUser, getAllUsers } = require("../db/userQueries");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const jwtSecret = process.env.JWT_SECRET;

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
			const payload = {
				id: user.id,
			};
			jwt.sign(payload, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.json({ user, token });
			});
		} else {
			user = await createNewUser(uid, name, email, mobile, photoURL);
			await user.save();
			const payload = {
				id: user.id,
			};

			jwt.sign(payload, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.json({ user, token });
			});

			res.json({ user, message: "user saved" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
