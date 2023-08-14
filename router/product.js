const express = require("express");
// const server = express();
const productController = require("../controller/product")


const router = express.Router();

//server attach this to router a


// console.log(typeof productController.getAllProducts)

router
.post("", productController.createProduct)
.get("", productController.getAllProducts)
.get("/:id", productController.getProduct)
.put("/:id", productController.replaceProduct)
.patch("/:id", productController.updateProduct)
.delete("/:id", productController.deleteProduct)

exports.router = router