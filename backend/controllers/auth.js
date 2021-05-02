const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  //express-validationresult binds results with req body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  // saving user
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to connect to db",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  // login
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(404).json({ error: "Email is not valid" });
    }
    if (!user.autheticate(password)) {
      res.status(401).json({
        error: "Email and Password do not match",
      });
    }
    // generating a token using jwt
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // svaing token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // send res to front-end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout sucessfully ",
  });
};

// protected routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});
// not using next( ) cause expressjwt covered it for us

// middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  // req.profile from frontend
  if (!checker) {
    return res.status(403).json({
      error: "access denaid",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: " you are not admin",
    });
  }
  next();
};
