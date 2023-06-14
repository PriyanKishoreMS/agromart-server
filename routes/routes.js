const express = require("express");
const { getUsers } = require("./api/user.js");
const router = express.Router();

router.route("/getuser").get(getUsers);

module.exports = router;
