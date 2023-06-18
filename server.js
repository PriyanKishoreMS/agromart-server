const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/routes.js");
const connectMongoDB = require("./config/mongodb.js");
const cors = require("cors");

connectMongoDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
