const Product = require("../models/Product");

exports.getAllProducts = async (page, limit, search, sort, order) => {
	try {
		let products = await Product.find({
			productName: { $regex: search, $options: "i" },
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit)
			.populate("user", "name photoURL");

		const total = await Product.countDocuments({
			productName: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			products,
			total,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Query Error getting product", Error: err });
		throw err;
	}
};

exports.getAllProductsinCategory = async (
	page,
	limit,
	search,
	sort,
	order,
	category
) => {
	try {
		let products = await Product.find({
			productName: { $regex: search, $options: "i" },
			productCategory: category,
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit)
			.populate("user", "name photoURL");

		const total = await Product.countDocuments({
			productName: { $regex: search, $options: "i" },
			productCategory: category,
		});
		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			products,
			total,
			totalPages,
		};
	} catch (err) {
		console.error({
			Message: "Query Error getting category product",
			Error: err,
		});
		throw err;
	}
};

exports.createProduct = async productData => {
	try {
		let product = new Product(productData);
		await product.save();
		return product;
	} catch (err) {
		console.error({ Message: "Query Error creating product", Error: err });
		throw err;
	}
};

exports.getProductByIdOnDb = async id => {
	try {
		let product = await Product.findById(id).populate("user", "name photoURL");
		if (!product) return null;
		return product;
	} catch (err) {
		console.error({ Message: "Query Error getting product by id", Error: err });
		throw err;
	}
};

exports.deleteProductOnDb = async id => {
	try {
		let product = await Product.findByIdAndDelete(id);
		if (!product) return null;
		return product;
	} catch (err) {
		console.error({ Message: "Query Error deleting product", Error: err });
		throw err;
	}
};
