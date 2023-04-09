const express = require("express")
const router = express.Router()
const { authVendor, authUser } = require("../middlewere/auth")
const productController = require("../Controller/product.controllers")
const {
    validatation4addproduct,
    validatation4updateproduct
} = require("../utils/joi.validate")

router.post("/add-product", authVendor, validatation4addproduct, productController.addProduct)
router.post("/get-product", authUser, productController.getProduct)
router.get("/getProductById", authVendor, productController.getProductById)
router.put("/update-product", authVendor, validatation4updateproduct, productController.updateProduct)
router.delete("/delete-product", authVendor, productController.deleteProduct)
router.post("/buy-product", productController.buyProduct)
router.post("/addToCart", authUser, productController.addToCart)
router.get("/getCartProduct", authUser, productController.getCartProduct)
router.post("/orderSuccess", authUser, productController.orderSuccess)
module.exports = router