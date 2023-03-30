const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const materialController = require("../Controller/material.controllers")
const {
    validatation4addmaterial,
    validatation4updatematerial
} = require("../utils/joi.validate")

router.post("/add-material", authAdmin, validatation4addmaterial, materialController.addMaterial)
router.get("/get-material", materialController.getMaterial)
router.put("/update-material", authAdmin, validatation4updatematerial, materialController.updateMaterial)
router.delete("/delete-material", authAdmin, materialController.deleteMaterial)

module.exports = router