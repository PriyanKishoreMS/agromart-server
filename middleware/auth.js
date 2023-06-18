const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
	const token = req.header("auth-token");

	if (!token) return res.status(401).json({ msg: "Authorization denied" });

	try {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				console.err(err);
				res.status(500).json({ msg: "Token Invalid" });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		console.error("Problem with the middleware");
		res.status(500).json({ msg: "Server error" });
	}
};

module.exports = auth;
