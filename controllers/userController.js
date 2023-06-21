const { findUser, createNewUser, getAllUsers } = require("../db/userQueries");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

exports.getUsers = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "date";
		const order = req.query.order || "desc";

		let users = await getAllUsers(page, limit, search, sort, order);
		res.json(users);
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
			console.log(user.id, "already exists");
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(payload, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} else {
			user = await createNewUser(uid, name, email, mobile, photoURL);
			await user.save();
			console.log(user.id, "record created");
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};
