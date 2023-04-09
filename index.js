const express = require("express");
const app = express();
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
require("dotenv").config()
require("./database");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("files"));
app.use(Cors());
app.use('/upload',express.static('upload'));

// Define All Routes file Here
const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes")
const subCategoryRoutes = require("./routes/subcategory.routes")
const superAdminRoutes = require("./routes/superAdmin.routes")
const productRoutes = require("./routes/product.routes")
const materialRoutes = require("./routes/material.routes")
const contactRoutes = require("./routes/contactus.routes")
const blogRoutes = require("./routes/blog.routes")
const reviewRoutes = require("./routes/review.routes")
const imageRoutes = require("./routes/upload-image")
const customizationRoutes = require("./routes/customization.routes")
const wishlistRoutes = require("./routes/wishlist.routes")

// Define All Routes Here
app.use("/users", userRoutes)
app.use("/category", categoryRoutes)
app.use("/subcategory", subCategoryRoutes)
app.use("/superAdmin", superAdminRoutes)
app.use("/contact", contactRoutes)
app.use("/product", productRoutes)
app.use("/material", materialRoutes)
app.use("/image", imageRoutes)
app.use("/blog", blogRoutes)
app.use("/review", reviewRoutes)
app.use("/customization", customizationRoutes)
app.use("/wishlist", wishlistRoutes)

app.listen(1111, () => {
	console.log("server started");
});

