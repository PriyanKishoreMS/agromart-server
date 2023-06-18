const express = require("express");
const { getUsers, postUsers } = require("../controllers/userController");
const { postLandService } = require("../controllers/landServiceController");
const router = express.Router();

router.route("/getUser").get(getUsers);
router.route("/postUser").post(postUsers);
router.route("/postLandService").post(postLandService);

module.exports = router;
