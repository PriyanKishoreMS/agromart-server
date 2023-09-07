const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/routes.js");
const connectMongoDB = require("./config/mongodb.js");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
connectMongoDB();

app.use(helmet());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Yeloo World!");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
