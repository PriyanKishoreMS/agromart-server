const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/routes.js");
const connectMongoDB = require("./config/mongodb.js");

connectMongoDB();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
