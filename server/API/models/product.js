const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, min: 100, max: 500 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
