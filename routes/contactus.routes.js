const express = require("express")
const router = express.Router()
const { authUser, authAdmin } = require("../middlewere/auth")
const contactController = require("../Controller/contactus.controllers")

router.post("/addContact", authUser, contactController.addContact)
router.get("/getContact", contactController.getContact)
router.delete("/deleteContact", authAdmin, contactController.deleteContact)

module.exports = router