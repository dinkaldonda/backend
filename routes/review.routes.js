const express = require("express")
const router = express.Router()
const { authUser, authAdmin } = require("../middlewere/auth")
const reviewController = require("../Controller/review.controllers")
const {
    validatation4addReview
} = require("../utils/joi.validate")

router.post("/addReview", authUser, validatation4addReview, reviewController.addReview)
router.get("/getReview", reviewController.getReview)
router.delete("/deleteReview", authAdmin, reviewController.deleteReview)

module.exports = router