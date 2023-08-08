const {
	createProduct,
	getAllProducts,
	getAllProductsinCategory,
	deleteProductOnDb,
	getProductByIdOnDb,
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
		console.error(err);
		res.status(500).json({ msg: "Error getting products", err: err.message });
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
		console.error(err);
		res
			.status(500)
			.json({ msg: "Error getting product category", err: err.message });
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
		console.error(err);
		res.status(500).json({ msg: "Error creating product", err: err.message });
	}
};

exports.getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await getProductByIdOnDb(id);
		if (!result) return res.status(404).json({ msg: "Product not found" });
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting product", err: err.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const reqUser = req.user.id;
		const role = req.user.role;
		const id = req.params.id;
		const doc = await getProductByIdOnDb(id);
		if (!doc) return res.status(404).json({ msg: "Product not found" });
		const docUser = doc.user._id.toString();
		if (reqUser !== docUser && role !== "admin")
			return res.status(401).json({ msg: "Unauthorized" });
		const result = await deleteProductOnDb(id);
		const photos = result.productImage;
		photos.forEach(photo => {
			fs.unlinkSync(photo);
		});
		res.json({ result, msg: "Product deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error deleting product", err: err.message });
	}
};
