const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From data base", doc);
      if (doc) {
        res.status(200).json({ doc });
      } else {
        res.status(404).json({ message: "no valid entry found for given id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
