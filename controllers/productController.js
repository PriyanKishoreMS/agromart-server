const {
	createProduct,
	getAllProducts,
	getAllProductsinCategory,
} = require("../db/productQueries");

exports.getProducts = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "date";
		const order = req.query.order || "desc";

		let products = await getAllProducts(page, limit, search, sort, order);
		res.json(products);
	} catch (err) {
		console.error({ Message: "Controller Error getting Products", Error: err });
		res.status(500).send("Server Error");
	}
};

exports.getProductCategory = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "date";
		const order = req.query.order || "desc";
		const productCategory = req.params.category;

		let products = await getAllProductsinCategory(
			page,
			limit,
			search,
			sort,
			order,
			productCategory
		);
		res.json(products);
	} catch (err) {
		console.error({
			Message: "Controller Error getting category Products",
			Error: err,
		});
		res.status(500).send("Server Error");
	}
};

exports.postProduct = async (req, res) => {
	try {
		const {
			productName,
			productCategory,
			productManufacturer,
			productDescription,
			productPrice,
			productQuantity,
		} = req.body;
		const user = req.user.id;
		// const productName = "Apple";
		// const productCategory = "Fruit";
		// const productManufacturer = "Nepal";
		// const productDescription = "This is an apple";
		// const productPrice = "100";
		// const productQuantity = "10";
		// const uploadPromise = new Promise((resolve, reject) => {
		// 	productUpload.array("images", 3)(req, res, err => {
		// 		if (err) return res.status(500).json({ msg: "Error uploading image" });
		// 		let productImage = req.files.map(file => file.path);
		// 		console.log("first", productImage);
		// 		resolve(productImage);
		// 	});
		// });
		// const productImage = await uploadPromise;
		const productImage = req.files.map(file => file.path);
		const productData = {
			user,
			productName,
			productCategory,
			productManufacturer,
			productDescription,
			productPrice,
			productQuantity,
			productImage,
		};
		const result = await createProduct(productData);
		res.json(result);
	} catch (err) {
		console.error({ Message: "Controller Error posting product", Error: err });
		res.status(500).send("Server Error");
	}
};
