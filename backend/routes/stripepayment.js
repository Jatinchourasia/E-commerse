const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { makePayment } = require("../controllers/stripepayment");
router.post("/stripepayment", makePayment);

module.exports = router;
