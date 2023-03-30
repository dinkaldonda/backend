const express = require("express")
const router = express.Router()
const { authUser } = require("../middlewere/auth")
const wishlistController = require("../Controller/wishlist.controllers")
const {
    validatation4wishlist
} = require("../utils/joi.validate")

router.post("/add-wishlist", authUser, validatation4wishlist, wishlistController.addWishlist)
router.get("/get-wishlist", authUser, wishlistController.getWishlist)
router.delete("/delete-wishlist", authUser, validatation4wishlist, wishlistController.deleteWishlist)
module.exports = router