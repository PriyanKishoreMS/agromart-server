const express = require("express");
const {
	getUsers,
	postUsers,
	updateUsers,
	updateUserByAdmin,
	deleteUserByAdmin,
	getUserLands,
	getUserProducts,
} = require("../controllers/userController");
const {
	getLandServices,
	postLandService,
	// getLandCategory,
	deleteLandService,
	getLandServiceById,
	// updateLandService,
} = require("../controllers/landServiceController");
const {
	getProducts,
	// getProductCategory,
	getProductById,
	postProduct,
	deleteProduct,
} = require("../controllers/productController");
const {
	postDonation,
	getDonations,
} = require("../controllers/donationController");
const {
	getGallery,
	postGallery,
	deleteGallery,
} = require("../controllers/galleryController");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/auth");
const {
	landUpload,
	productUpload,
	galleryUpload,
} = require("../config/upload");

router.route("/postDonation").post(postDonation);
router.route("/getDonations").get(getDonations);
router
	.route("/postGallery")
	.post(adminAuth, galleryUpload.single("galleryImage"), postGallery);
router.route("/getGallery").get(getGallery);
router.route("/deleteGallery/:id").delete(adminAuth, deleteGallery);
router.route("/getUser").get(adminAuth, getUsers);
router.route("/postUser").post(postUsers);
router.route("/updateUser").put(auth, updateUsers);
router.route("/updateUser/:id").put(adminAuth, updateUserByAdmin);
router.route("/deleteUser/:id").delete(adminAuth, deleteUserByAdmin);
router.route("/userLands/:id").get(auth, getUserLands);
router.route("/userProducts/:id").get(auth, getUserProducts);

router.route("/getLandService").get(auth, getLandServices);
// router.route("/getLandService/:category").get(auth, getLandCategory);
router.route("/getLandService/:id").get(auth, getLandServiceById);
router
	.route("/postLandService")
	.post(auth, landUpload.array("landImage", 5), postLandService);
router.route("/deleteLandService/:id").delete(auth, deleteLandService);
// router.route("/updateLandService/:id").put(auth, updateLandService);

router.route("/getProduct").get(auth, getProducts);
// router.route("/getProduct/:category").get(auth, getProductCategory);
router.route("/getProduct/:id").get(auth, getProductById);
router
	.route("/postProduct")
	.post(auth, productUpload.array("productImage", 5), postProduct);
router.route("/deleteProduct/:id").delete(auth, deleteProduct);

module.exports = router;
