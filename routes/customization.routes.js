const express = require("express")
const router = express.Router()
const { authUser,authAdmin } = require("../middlewere/auth")
const customizationController = require("../Controller/customization.controllers")
const {
    validatation4addcustomization
} = require("../utils/joi.validate")

router.post("/add-customization", authUser, validatation4addcustomization, customizationController.addCustomization)
router.get("/get-customization", authAdmin, customizationController.getCustomization)
router.delete("/delete-customization", authAdmin, customizationController.deleteCustomization)

module.exports = router