const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
// filesystem
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found in db",
        });
      }
      req.product = product;
      next();
    });
};
// create product controller

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, feilds, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // restriction in field

    const { name, description, price, category, stock } = feilds;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: " please include all feild",
      });
    }

    // checking file size

    let product = new Product(feilds);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          err: "file too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save in db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "saving product in db failed",
        });
      }
      res.json(product);
    });
  });
};
// get controller

exports.getProduct = (req, res) => {
  // undefined so that our rest of the data load fast
  req.product.photo = undefined;
  return res.json(req.product);
};
//middleware so after loading data fom get  product it will load the images
// performance optimization
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// update controller

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtention = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        eroor: "image problem",
      });
    }

    let product = new Product(fields);
    product = _.extend(product.fields);
    // extends it invlves al the previous values
  });
};

// deletion controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "cannot delete product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deleteProduct,
    });
  });
};

// get all unique category

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "cannot get ubnique properties",
      });
    }
    res.json(category);
  });
};

// get all product

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo") //- for not including photos
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "cannot fetch all products",
        });
      }
      res.json(products);
    });
};

// update stocks middleware

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.product.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, product) => {
    return res.status(400).json({
      error: "Bulk operation failed",
    });
  });
};
