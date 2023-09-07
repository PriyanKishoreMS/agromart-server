const {
	getAllBlogs,
	createBlog,
	deleteBlogOnDb,
	getBlogByIdOnDb,
} = require("../db/blogsQueries");

exports.getBlogs = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "title";
		const order = req.query.order || "desc";

		let blogs = await getAllBlogs(page, limit, search, sort, order);
		res.json(blogs);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error getting blogs", err: err.message });
	}
};

exports.postBlog = async (req, res) => {
	try {
		const user = req.user.id;
		const { title, content, tags } = req.body;

		const blogData = {
			user,
			title,
			content,
			tags,
		};

		console.log(blogData, "blogData");

		const result = await createBlog(blogData);
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error creating blog", err: err.message });
	}
};

exports.deleteBlog = async (req, res) => {
	try {
		const id = req.params.id;
		const blog = await getBlogByIdOnDb(id);

		if (!blog) return res.status(404).json({ msg: "Blog not found" });

		const result = await deleteBlogOnDb(id);

		res.json({ result, msg: "Blog deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Error deleting blog", err: err.message });
	}
};
