const express = require("express");
const {
	getUsers,
	postUsers,
	updateUsers,
} = require("../controllers/userController");
const {
	getLandServices,
	postLandService,
	getLandCategory,
} = require("../controllers/landServiceController");
const {
	getProducts,
	getProductCategory,
	postProduct,
} = require("../controllers/productController");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { landUpload, productUpload } = require("../config/upload");

router.route("/getUser").get(getUsers);
router.route("/postUser").post(postUsers);
router.route("/updateUser").put(auth, updateUsers);

router.route("/getLandService").get(auth, getLandServices);
router.route("/getLandService/:category").get(auth, getLandCategory);
router
	.route("/postLandService")
	.post(auth, landUpload.array("landImage", 5), postLandService);

router.route("/getProduct").get(auth, getProducts);
router.route("/getProduct/:category").get(auth, getProductCategory);
router
	.route("/postProduct")
	.post(auth, productUpload.array("productImage", 5), postProduct);

module.exports = router;
