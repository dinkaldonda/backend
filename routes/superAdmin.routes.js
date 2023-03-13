const express = require("express")
const router = express.Router()
const superAdminController = require("../Controller/superAdmin.controllers")
const {
} = require("../utils/joi.validate")

router.post("/super-admin-login", superAdminController.superAdminLogin)

module.exports = router