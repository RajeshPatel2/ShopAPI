const Order = require("../../models/orders");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productsId, //this productsId is to be passed as variable name in body in postman
    quantity: req.body.quantity,
  });
  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "orders was created",
        order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
