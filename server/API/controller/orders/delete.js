const { Mongoose } = require("mongoose");
const Order = require("../../models/orders");

module.exports = (req, res, next) => {
  const id = req.params.ordersId;
  console.log(id);
  console.log(req.params);
  Order.deleteOne({ _id: id })
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
