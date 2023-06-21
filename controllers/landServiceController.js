const { landUpload } = require("../config/upload");
const {
	createLandService,
	getAllLandServices,
} = require("../db/landServiceQueries");

exports.getLandServices = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "date";
		const order = req.query.order || "desc";

		let landServices = await getAllLandServices(
			page,
			limit,
			search,
			sort,
			order
		);
		res.json(landServices);
	} catch (err) {
		console.error({ Message: "Controller Error getting lands", Error: err });
		res.status(500).send("Server Error");
	}
};

exports.postLandService = async (req, res) => {
	try {
		const { landLocation, soilType, waterFacility, landPrice, landDesc } =
			req.body;
		const user = req.user.id;
		// const landLocation = "Kathmandu";
		// const soilType = "Black";
		// const waterFacility = "Yes";
		// const landPrice = "100000";
		// const landDesc = "This is a land";
		const uploadPromise = new Promise((resolve, reject) => {
			landUpload.array("images", 3)(req, res, err => {
				if (err) return res.status(500).json({ msg: "Error uploading image" });
				let landImage = req.files.map(file => file.path);
				console.log("first", landImage);
				resolve(landImage);
			});
		});
		const landImage = await uploadPromise;
		const landData = {
			user,
			landLocation,
			soilType,
			waterFacility,
			landPrice,
			landDesc,
			landImage,
		};
		const result = await createLandService(landData);
		res.json(result);
	} catch (err) {
		console.error({
			Message: "Controller Error posting service data",
			Error: err,
		});
		res.status(500).send("Server Error");
	}
};
