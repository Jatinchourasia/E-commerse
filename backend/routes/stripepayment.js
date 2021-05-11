const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { makePayment } = require("../controllers/stripepayment");
router.post("/stripepayment", isSignedIn, isAuthenticated, makePayment);

module.exports = router;
