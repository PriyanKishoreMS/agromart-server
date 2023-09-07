const Blog = require("../models/Blog");

exports.createBlog = async blogData => {
	try {
		let blog = new Blog(blogData);
		await blog.save();
		return blog;
	} catch (err) {
		console.error({ Message: "Query Error creating blog", Error: err });
	}
};

exports.getAllBlogs = async (page, limit, search, sort, order) => {
	try {
		let blogs = await Blog.find({
			title: { $regex: search, $options: "i" },
		})
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const total = await Blog.countDocuments({
			title: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(total / limit);
		return {
			page: page + 1,
			blogs,
			total,
			totalPages,
		};
	} catch (err) {
		console.error({ Message: "Query Error getting blogs", Error: err });
	}
};

exports.getBlogByIdOnDb = async id => {
	try {
		let blog = await Blog.findById(id).populate("user", "name photoURL");
		if (!blog) return null;
		return blog;
	} catch (err) {
		console.error({
			Message: "Query Error getting blog by id",
			Error: err,
		});
		throw err;
	}
};

exports.deleteBlogOnDb = async id => {
	try {
		let deletedBlog = await Blog.findByIdAndDelete(id);
		if (!deletedBlog) return null;
		return deletedBlog;
	} catch (err) {
		console.error({ Message: "Query Error deleting blog", Error: err });
		throw err;
	}
};
