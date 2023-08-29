const multer = require("multer");

const landFileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/lands");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	},
});

const productFileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/products");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	},
});

const storage = multer.memoryStorage();

// exports.landUpload = multer({ storage: landFileStorageEngine });
// exports.productUpload = multer({ storage: productFileStorageEngine });
exports.upload = multer({ storage: storage });
