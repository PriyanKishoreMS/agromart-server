const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	userType: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	mobile: {
		type: String,
	},
	photoURL: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("user", UserSchema);
