const upload = require("../config/upload");
const { createLandService } = require("../db/landServiceQueries");

exports.postLandService = async (req, res) => {
	try {
		const { landLocation, soilType, waterFacility, landPrice, landDesc } =
			req.body;
		// const landLocation = "Kathmandu";
		// const soilType = "Black";
		// const waterFacility = "Yes";
		// const landPrice = "100000";
		// const landDesc = "This is a land";
		const uploadPromise = new Promise((resolve, reject) => {
			upload.array("images", 3)(req, res, err => {
				if (err) return res.status(500).json({ msg: "Error uploading image" });
				let landImage = req.files.map(file => file.path);
				console.log("first", landImage);
				resolve(landImage);
			});
		});

		const landImage = await uploadPromise;
		const landData = {
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
		console.error({ Message: "Error posting service data", Error: err });
		res.status(500).send("Server Error");
	}
};
