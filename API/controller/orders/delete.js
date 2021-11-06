const Order = require("../../models/orders");

module.exports = (req, res, next) => {
  const id = req.params.ordersId;
  res.status(200).json({
    message: "orders deleted",
    id: id,
  });
};
