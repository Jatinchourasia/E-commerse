const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getProductById,
  createProduct,
  getProduct,
  updateProduct,
  photo,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
// params
router.param("userId", getUserById);

router.param("productId", getProductById);

// actual routes

// create

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
// update

// delete

module.exports = router;
