const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
	const token = req.header("auth-token");

	if (!token) return res.status(401).json({ msg: "Authorization denied" });

	try {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				console.err(err);
				return res.status(401).json({ msg: "Token Invalid" });
			} else {
				req.user = decoded.user;
				console.log("user", req.user);
				next();
			}
		});
	} catch (err) {
		console.error("Problem with the middleware");
		res.status(500).json({ msg: "Server error" });
	}
};

const adminAuth = (req, res, next) => {
	const token = req.header("auth-token");

	if (!token) return res.status(401).json({ msg: "Authorization denied" });

	try {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				console.err(err);
				return res.status(401).json({ msg: "Token Invalid" });
			}
			if (decoded.user.role !== "admin") {
				return res.status(401).json({ msg: "Authorization denied" });
			}
			req.user = decoded.user;
			console.log("user", req.user);
			next();
		});
	} catch (err) {
		console.error(err.message);
		res
			.status(500)
			.json({ err: err.message, msg: "Error with the middleware" });
	}
};

module.exports = { auth, adminAuth };
