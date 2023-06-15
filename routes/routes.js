const express = require("express");
const { getUsers, postUsers } = require("../controllers/userControllers");
const router = express.Router();

router.route("/getUser").get(getUsers);
router.route("/postUser").post(postUsers);

module.exports = router;
