const User = require("../models/user");
const Order = require("../models/order");
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "no user found in db",
      });
    }
    req.profile = user;
    next();
  });
};
// get all users
// exports.getUsers = (req, res) => {
//   User.find().exec((err, users) => {
//     if (err || !users) {
//       return res.status(400).json({
//         err: "no user found in db",
//       });
//     }
//     res.json(users);
//   });
// };

exports.getUser = (req, res) => {
  // it will show every info to prevent password to show will undefine some feild
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    // find the user
    { _id: req.profile._id },
    {
      // it will update all the info coming from frontend
      $set: req.body,
    },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "not authourise to update the user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchesList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json(order);
      }
    });
};

// push order to purches list

exports.pushOrderToPurchesList = (req, res, next) => {
  let purcheses = [];
  req.body.order.products.forEach((product) => {
    purcheses.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transection_id: req.body.order.quantity,
    });
  });

  // store in db
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purcheses: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "unable to save purchase list",
        });
      }
      next();
    }
  );
};
