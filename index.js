const express = require("express");
const app = express();
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("files"));
app.use(Cors());

// Define All Routes file Here
const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes")
const subCategoryRoutes = require("./routes/subcategory.routes")
const superAdminRoutes = require("./routes/superAdmin.routes")

// Define All Routes Here
app.use("/users", userRoutes)
app.use("/category", categoryRoutes)
app.use("/subcategory", subCategoryRoutes)
app.use("/superAdmin", superAdminRoutes)
// app.post("/insert-user", userController.insertUserController);
// app.post("/login", userController.loginUsers);
// app.post("/insert-catagory", userController.insertCatagory);
// app.get("/get-catagorylist", userController.getCatagoryList);
// app.post("/insert-subcatagory", userController.insertSubCatagory);
// app.get("/get-colorlist", userController.getColorList);
// app.post("/insert-color", userController.colorInsertController);
// app.post("/insert-product", productController.insertProduct);
// app.get("/get-product", productController.getProduct);
// app.get("/get-subcatagorylist/:c_id", userController.getSubCategoryList);

app.listen(8000, () => {
	console.log("server started");
});

// const express = require("express");
// const app = express();
// const db = require("./database");
// const bodyParser = require("body-parser");
// const Cors = require("cors");
// const userController = require("./controllers/user.control");
// const subscriptionController = require("./controllers/subscription.controller");
// const attributeController = require("./controllers/attributes.controller");
// const productController = require("./controllers/product.controller");
// const fileUpload = require("express-fileupload");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(express.static("files"));
// app.use(Cors());
// app.get("/", function (req, res) {
//   res.send("hi");
// });
// app.get("/get-userlist", userController.getUserList);
// app.get("/get-catagorylist", userController.getCatagoryList);
// app.get("/get-color", attributeController.getColorList);
// app.get("/get-size", attributeController.getSizeList);
// app.get("/get-subcatagory/:c_id", userController.getSubCatagoryList);
// app.post("/insert-user", userController.insertUserController);
// app.patch("/update-user", userController.updateUserController);
// app.post("/login", userController.loginUsers);
// app.post("/insert-catagory", userController.insertCatagory);
// app.post("/insert-subcatagory", userController.insertSubCatagory);
// app.post("/insert-subscription", subscriptionController.insertSubscription);
// app.delete("/delete-user", userController.deleteUser);
// app.post("/insert-color", attributeController.colorInsertController);
// app.post("/insert-size", attributeController.sizeInsertController);
// app.post("/insert-product", productController.insertProduct);
