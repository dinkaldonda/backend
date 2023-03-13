const userModel = require("../Models/user.model");
const catagoryModel = require("../Models/catagory.model.js");
const subCatagoryModel = require("../Models/subcatagory.model.js");
const colorModel = require("../Models/color.model");

var getSubCategoryList = (req, res) => {
	console.log(req.params.c_id);
	try {
		subCatagoryModel.find({ c_id: req.params.c_id }).then((subcategory) => {
			if (subcategory) {
				console.log(subcategory);
				res.send({ data: subcategory, msg: "called" }).status(404);
			} else {
				res.send({ status: 0, data: [], msg: "not" });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
var insertUserController = (req, res) => {
	try {
		console.log(req.body, "inserted");
		userModel
			.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone: req.body.phone,
			})
			.then((result) => {
				if (result) {
					res.send({ status: 1, result: result });
				} else {
					res.send({ status: 0, message: "not inserted" });
				}
			})

			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var loginUsers = (req, res) => {
	try {
		userModel
			.findOne({ email: req.body.email, password: req.body.password })
			.then((result) => {
				console.log(result, "login successfully...");
				if (result != null) {
					console.log(result, "login successfully...");
					res.send({
						status: 1,
						result: result,
						message: "login successfully",
					});
				} else {
					res.send({
						status: 0,
						result: [],
						message: "email or passsword invalid",
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log("not Exist");
	}
};

var insertCatagory = (req, res) => {
	try {
		console.log(req.body);
		catagoryModel
			.create({
				c_name: req.body.c_name,
			})
			.then((result) => {
				if (result) {
					res.send({
						status: 1,
						result: result,
						msg: "Category Inserted successfully...",
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var getCatagoryList = (req, res) => {
	try {
		catagoryModel
			.find()
			.then((catagory) => {
				if (catagory) {
					res.send({ status: 1, data: catagory, msg: "catagory list" });
				} else {
					res.send({ status: 0, data: [], msg: " List not found" });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var insertSubCatagory = (req, res) => {
	try {
		console.log(req.body);
		subCatagoryModel
			.create({
				s_c_name: req.body.s_c_name,
				c_id: req.body.c_id,
			})
			.then((result) => {
				if (result) {
					res.send({ status: 1, result: result, msg: "inserted" });
				} else {
					res.send({ status: 0, result: [], msg: "not inserted" });
				}
			});
	} catch (error) {
		console.log(error);
	}
};

var updateUserController = (req, res) => {
	try {
		console.log(req.body, "update called");
		// console.log(req.params, "called params");
		userModel
			.findByIdAndUpdate(
				{
					_id: req.body._id,
				},
				// .findOneAndUpdate(
				//   {
				//     name: req.params.name,
				//   },
				{
					name: req.body.name,
					email: req.body.email,
					mono: req.body.mono,
					password: req.body.password,
				}
			)
			.then((result) => {
				res.send({ result: result });
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var getUserList = (req, res) => {
	try {
		userModel
			.find()
			.then((users) => {
				console.log(users);
				res.send({ users: users });
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log("error found");
	}
};

var deleteUser = (req, res) => {
	try {
		userModel
			.findByIdAndDelete({ _id: req.body._id })
			.then((result) => {
				res.send({ status: 1, result: result, msg: "record deleted" });
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var colorInsertController = (req, res) => {
	try {
		console.log(req.body);
		colorModel
			.create({ color_name: req.body.color_name })
			.then((result) => {
				if (result) {
					// console.log(result);
					res.send({ status: 1, result: result, msg: "color inserted" });
				} else {
					res.send({ status: 0, result: [], msg: "color not inserted" });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

var getColorList = (req, res) => {
	try {
		console.log(req.body);
		colorModel
			.find()
			.then((result) => {
				if (result) {
					// console.log(result);
					res.send({ status: 1, data: result, msg: "list gotted" });
				} else {
					res.send({ status: 0, data: [], msg: "not inserted color" });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getUserList,
	insertUserController,
	updateUserController,
	loginUsers,
	insertCatagory,
	getCatagoryList,
	insertSubCatagory,
	deleteUser,
	colorInsertController,
	getColorList,
	getSubCategoryList,
};
