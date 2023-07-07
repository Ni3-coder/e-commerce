const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require('cors');

// rest object
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// configure env
dotenv.config();

//database config
connectDB();

// rest api
app.get("/", (req,res) => {
    res.send("<h1>Welcome to MERN App</h1>");
});

// Port
const PORT = process.env.PORT || 5000;

// run listen
app.listen(PORT, () => {
    console.log(`server Running on ${PORT}`);
});