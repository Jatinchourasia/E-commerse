const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
module.export = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Scema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

module.export = mongoose.model("Order", OrderSchema);
