const LandService = require("../models/LandService");

exports.createLandService = async landData => {
	let landService = new LandService(landData);
	await landService.save();
	return landService;
};
