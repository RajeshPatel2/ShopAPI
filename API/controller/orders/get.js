const Order = require("../../models/orders");

module.exports = (req, res, next) => {
  Order.find()
    .populate("product") //here this product is same as product in line 5 in orders.js schema file
    .select("quantity")
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "orders were fetched",
        orders: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
module.exports = (req, res, next) => {
  res.status(200).json({
    message: "orders details",
    id: req.params.ordersId,
  });
};
