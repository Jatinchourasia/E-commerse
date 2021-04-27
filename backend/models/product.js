const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlenght: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlenght: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlenght: 32,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.export = mongose.model("Product", productSchema);
