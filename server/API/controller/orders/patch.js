const Orders = require("../../models/orders");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.ordersId;
  console.log(req.params);

  Orders.findOneAndUpdate({ _id: id }, { $set: req.body })
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
