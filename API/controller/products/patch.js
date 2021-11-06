const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.productId;
  const updateV = {};
  console.log("body ", req.body);
  for (const v of req.body) {
    updateV[v.propName] = v.value;
  }
  Product.findByIdAndUpdate(id, updateV)
    .exec()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
