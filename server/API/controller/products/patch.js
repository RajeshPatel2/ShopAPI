const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.productId;
  console.log(req.params);

  Product.findOneAndUpdate({ _id: id }, { $set: req.body })
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
