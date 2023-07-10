const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const passwordRoute = require("./routes/passwordRoute");
const openai = require("./routes/openai");

const PORT = process.env.PORT || 8080;

//rest object
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/password", passwordRoute);
app.use("/api/v1/openai",openai);

app.listen(8080, () => {
// console.log("server is running");
});
