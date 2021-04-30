const express = require("express");
const router = express.Router();

// for validation
const { check } = require("express-validator");
const {
  signup,
  signout,
  signin,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 char").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be 8 char long").isLength({ min: 8 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "enter valid email").isEmail(),
    check("password", "enter valid password").isLength({ min: 8 }),
  ],
  signin
);
router.get("/signout", signout);

// test route
// router.get("/testroute", isSignedIn, (req, res) => {
//   res.send("protected route");
// });

module.exports = router;
