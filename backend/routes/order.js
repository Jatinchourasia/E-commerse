const express = require("express");
const router = express.Router();

// controllers
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOrderToPurchesList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual routes

// create

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderToPurchesList,
  updateStock,
  createOrder
);

// read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
// update

// delete

// status of order

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
