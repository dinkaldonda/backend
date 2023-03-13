const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "catagories",
  },
  s_c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcatagories",
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "colors",
  },
  // gender: {
  //   type: String,
  // },
  seller_mobile: {
    type: Number,
  },
  milk: {
    type: Number,
  },
  lactation: {
    type: Number,
  },
});

module.exports = mongoose.model("products", productSchema);
